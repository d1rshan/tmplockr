import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { notes } from "@/lib/db/schema";
import { db } from "@/lib/db";

// Save note to db
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return new NextResponse("Title, Content Missing", { status: 400 });
    }

    const newNote = {
      title,
      content,
      clerkUserId: userId,
    };

    const result = await db.insert(notes).values(newNote).returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.log("[NOTES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Get all notes
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const notesList = await db
      .select()
      .from(notes)
      .where(eq(notes.clerkUserId, userId));

    return NextResponse.json(notesList);
  } catch (error) {
    console.log("[NOTES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Delete a note
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const body = await request.json();
    const { noteId } = body;

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
    console.log("[NOTES_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
