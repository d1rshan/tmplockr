import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { notes } from "@/lib/db/schema";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ noteId: number }> }
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

    const result = await db
      .delete(notes)
      .where(eq(notes.id, noteId))
      .returning();

    if (result.length === 0) {
      return new NextResponse("Note Not Found", { status: 400 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.log("[NOTE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
