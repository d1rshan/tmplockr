"use server";

import { ActionResponse } from "@/types";
import { createNoteSchema } from "../schemas";
import z from "zod";
import { db } from "@/lib/db";
import { notesTable } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { cacheTags } from "@/lib/cache-tags";
import { and, eq } from "drizzle-orm";

export async function createNote(
  unsafeData: z.infer<typeof createNoteSchema>
): ActionResponse {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, message: "UNAUTHORIZED" };
    }

    const { success, data } = createNoteSchema.safeParse(unsafeData);

    if (!success) {
      return { success: false, message: "FAILED TO CREATE NOTE" };
    }

    await db.insert(notesTable).values({
      ...data,
      userId,
    });

    revalidateTag(cacheTags.notes);
    return { success: true, message: "NOTE CREATED" };
  } catch (error) {
    console.log("[CREATE_NOTE]", error);
    return { success: false, message: "INTERNAL ERROR" };
  }
}

export async function deleteNote(noteId: string): ActionResponse {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, message: "UNAUTHORIZED" };
    }

    await db
      .delete(notesTable)
      .where(and(eq(notesTable.userId, userId), eq(notesTable.id, noteId)));

    revalidateTag(cacheTags.notes);

    return { success: true, message: "NOTE DELETED" };
  } catch (error) {
    console.log("[DELETE_NOTE]", error);
    return { success: false, message: "INTERNAL ERROR" };
  }
}
