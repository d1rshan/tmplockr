import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { notesTable } from "@/lib/db/schema";
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

    const [note] = await db
      .insert(notesTable)
      .values({ title, content, userId })
      .returning();

    return NextResponse.json(note);
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

    const notes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.userId, userId));

    return NextResponse.json(notes);
  } catch (error) {
    console.log("[NOTES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
