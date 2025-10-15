import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { signInSchema } from "@/features/auth/schemas";

export async function POST(req: NextRequest) {
  try {
    const unsafeData = await req.json();

    const { data, success } = signInSchema.safeParse(unsafeData);

    if (!success) {
      return new NextResponse("Invalid request data", { status: 400 });
    }

    const { username, password } = data;

    // check if username exists in db & throw error if not -> and extract user from db
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    if (!user) {
      return new NextResponse("User does not exist", {
        status: 400,
      });
    }

    // use compare method from bcrypt to compare passwords & throw error if they don't match

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return new NextResponse("Incorrect password", { status: 400 });
    }

    // sign a jwt (with duration of 1day) & send it in res.cookie
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("1day")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "__lol",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24, // maxAge will automatically delete the cookie from browser
      sameSite: "strict",
      // secure: true, // only over https so use in prod
    });

    return response;
  } catch (error) {
    console.log("[SIGN_UP_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}