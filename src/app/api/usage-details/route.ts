import db from "@/lib/db";
import { users } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

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

    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching user's usage details", error);
    return NextResponse.json(
      { error: "Error fetching usage details" },
      { status: 500 }
    );
  }
}
