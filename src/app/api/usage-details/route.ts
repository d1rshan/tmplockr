import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import db from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 500 });
    }
    const result = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId));

    console.log(result);
    if (result.length !== 0)
      return NextResponse.json(result[0], { status: 200 });
    return NextResponse.json({ data: "NO FILES" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user's usage details", error);
    return NextResponse.json(
      { error: "Error fetching usage details" },
      { status: 500 }
    );
  }
}
