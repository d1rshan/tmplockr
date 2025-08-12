import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      const [user] = await db
        .insert(usersTable)
        .values({
          id: userId,
          notesUsed: 0,
          storageUsed: 0,
        })
        .returning();
      return NextResponse.json(user);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USAGE-DETAILS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
