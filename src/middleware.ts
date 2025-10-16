import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// middleware cannot use the auth() helper cause it cannot use cookies from next/headers
// TODO: add logic to prevent going to sign-in and sign-in when valid session exists
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("__lol")?.value;

  // 2. If no token is found, redirect to the login page
  if (!token) {
    // Ensure the redirect URL is absolute
    const loginUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Verify the token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    // If the token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    // If the token is invalid (expired, wrong signature, etc.), redirect to login
    const loginUrl = new URL("/sign-in", request.url);
    // You might want to clear the invalid cookie here or on the login page
    return NextResponse.redirect(loginUrl);
  }
}

// 4. Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (the login page itself)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)",
    // You can also explicitly list protected routes
    // '/dashboard/:path*',
    // '/settings/:path*',
  ],
};