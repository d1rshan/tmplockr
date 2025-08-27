import { db } from "@/lib/db";
import {
  codesTable,
  filesTable,
  notesTable,
  sharedFilesNotesTable,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    // no auth check btw;)
    const p = await params;
    const code = Number(p.code);

    if (p.code.length != 4) {
      return new NextResponse("Invalid Code Format", { status: 400 });
    }

    const share = await db
      .select()
      .from(codesTable)
      .where(eq(codesTable.code, code));

    if (share.length == 0) {
      return new NextResponse("Share Not Found", { status: 201 });
    }

    const files = await db
      .select({
        id: filesTable.id,
        name: filesTable.name,
        size: filesTable.size,
        type: filesTable.type,
        imagekitUrl: filesTable.imagekitUrl,
      })
      .from(sharedFilesNotesTable)
      .innerJoin(filesTable, eq(sharedFilesNotesTable.file_id, filesTable.id))
      .where(eq(sharedFilesNotesTable.code, code));

    // all notes for this code
    const notes = await db
      .select({
        id: notesTable.id,
        title: notesTable.title,
        content: notesTable.content,
      })
      .from(sharedFilesNotesTable)
      .innerJoin(notesTable, eq(sharedFilesNotesTable.note_id, notesTable.id))
      .where(eq(sharedFilesNotesTable.code, code));

    return NextResponse.json({ files, notes });
  } catch (error) {
    console.log("[CODE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
