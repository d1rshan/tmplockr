import db from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const res = await db
      .select()
      .from(files)
      .where(eq(files.clerkUserId, userId));

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Error fetching files from neondb", error);
    return NextResponse.json(
      { error: "Error fetching files" },
      { status: 500 }
    );
  }
}
