import { db } from "@/lib/db";
import { codesTable, sharedFilesNotesTable } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const { fileIds, noteIds } = await req.json();

    const code = await generateUniqueCode();

    await db.insert(codesTable).values({
      code,
      userId,
    });

    await db
      .insert(sharedFilesNotesTable)
      .values([
        ...fileIds.map((fileId: string) => [{ code, file_id: fileId }]),
        ...noteIds.map((noteId: string) => [{ code, note_id: noteId }]),
      ]);

    return NextResponse.json(code);
  } catch (error) {
    console.log("[SHARE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function generateUniqueCode(): Promise<number> {
  let code: number;
  let exists = true;

  while (exists) {
    code = Math.floor(1000 + Math.random() * 9000);

    const existing = await db
      .select()
      .from(codesTable)
      .where(eq(codesTable.code, code))
      .limit(1);

    exists = existing.length > 0;
  }

  return code!;
}
