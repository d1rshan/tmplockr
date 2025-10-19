import "server-only";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function auth() {
  const token = (await cookies()).get("__tmplockr_jwt")?.value;

  // 2. If no token, return null
  if (!token) {
    return null;
  }

  // 3. Verify the token
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify<{userId: string}>(token, secretKey);
    console.log(payload)
    return payload.userId; // it will just be userId claim
  } catch (error) {
    // 4. If verification fails, return null
    console.error("JWT Verification failed:", error);
    return null;
  }
}