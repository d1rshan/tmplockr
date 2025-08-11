import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { notes } from "@/lib/db/schema";
import { db } from "@/lib/db";

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
