import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }
    const result = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId));

    if (result.length !== 0) {
      return NextResponse.json(result[0]);
    }

    return NextResponse.json({ data: "NO FILES" });
  } catch (error) {
    console.error("[USAGE-DETAILS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
