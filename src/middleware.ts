import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const isPublic = isPublicRoute(req);
  const url = req.nextUrl.clone();

  // 🔒 If user is not signed in and trying to access a private route
  if (!userId && !isPublic) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 🔁 If user is signed in and trying to access public routes like "/", redirect to dashboard
  if (userId && isPublic) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ✅ Otherwise, allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    // All routes except static files and internal
    "/((?!_next|.*\\..*).*)",
  ],
};
