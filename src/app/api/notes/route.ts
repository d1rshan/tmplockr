import { notes } from "@/lib/db/schema";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// Save note to db
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newNote = {
      title,
      content,
      clerkUserId: userId,
    };

    const result = await db.insert(notes).values(newNote).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.log("ERROR SAVING NOTE TO DB", error);
    return NextResponse.json(
      { error: "Error saving note to db" },
      { status: 500 }
    );
  }
}

// Get all notes
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const notesList = await db
      .select()
      .from(notes)
      .where(eq(notes.clerkUserId, userId));

    return NextResponse.json(notesList, { status: 201 });
  } catch (error) {
    console.log("ERROR FETCHING NOTES FROM DB", error);
    return NextResponse.json(
      { error: "Error fetching notes from db" },
      { status: 500 }
    );
  }
}

// Delete a note
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const body = await request.json();
    const { noteId } = body;

    if (!noteId) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .delete(notes)
      .where(eq(notes.id, noteId))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.log("ERROR DELETING NOTE FROM DB", error);
    return NextResponse.json({ error: "Error deleting note" }, { status: 500 });
  }
}
