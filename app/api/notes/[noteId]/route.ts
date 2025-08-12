import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

import { notesTable, usersTable } from "@/lib/db/schema";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ noteId: string }> }
) {
  const { noteId } = await params;
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    if (!noteId) {
      return new NextResponse("Note ID Missing", { status: 400 });
    }

    const [note] = await db
      .delete(notesTable)
      .where(eq(notesTable.id, noteId))
      .returning();

    if (!note) {
      return new NextResponse("Note Not Found", { status: 400 });
    }

    const [user] = await db
      .update(usersTable)
      .set({ notesUsed: sql`${usersTable.notesUsed} - 1` })
      .where(eq(usersTable.id, userId))
      .returning();

    return NextResponse.json({ note, user });
  } catch (error) {
    console.log("[NOTE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
