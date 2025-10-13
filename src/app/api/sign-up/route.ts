import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { signUpSchema } from "@/features/auth/schemas";

export async function POST(req: NextRequest) {
  try {
    const unsafeData = await req.json();

    const { data, success } = signUpSchema
      .omit({ confirmPassword: true })
      .safeParse(unsafeData);

    if (!success) {
      return new NextResponse("Invalid request data", { status: 400 });
    }

    const { username, password } = data;

    // check if username already exists in db & throw error if it does
    const [userExists] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    if (userExists) {
      return new NextResponse("Username already taken", { status: 400 });
    }

    // hash password & save the account to db
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [newUser] = await db
      .insert(usersTable)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();

    // sign a jwt (with duration of 1day) & send it in res.cookie
    const token = await new SignJWT({ userId: newUser.id })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime("1day") // add expire claim in jwt payload too, cause if someone steals the jwt they can use it forever
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

// TODO: when signing up and signing in check if "session already exists"