"use server";

import { ActionResponse } from "@/types";
import { noteSchema } from "../schemas";
import z from "zod";
import { db } from "@/lib/db";
import { notesTable, usersTable } from "@/lib/db/schema";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { and, eq, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { APP_LIMITS } from "@/lib/consts";

export async function createNote(
  unsafeData: z.infer<typeof noteSchema>
): ActionResponse {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, message: "UNAUTHORIZED" };
    }

    const { success, data } = noteSchema.safeParse(unsafeData);

    if (!success) {
      return { success: false, message: "VALIDATION_FAILED" };
    }

    const [{ notesUsed }] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (notesUsed + 1 > APP_LIMITS.NOTES) {
      return { success: false, message: "USAGE_LIMIT_EXCEEDED" };
    }

    await db.insert(notesTable).values({
      ...data,
      userId,
    });

    await db.update(usersTable).set({
      notesUsed: notesUsed + 1,
    });

    revalidateTag(CACHE_TAGS.notes(userId));
    revalidateTag(CACHE_TAGS.usage_details(userId));

    return { success: true };
  } catch (error) {
    console.log("[CREATE_NOTE]", error);
    return { success: false, message: "INTERNAL_ERROR" };
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

    await db
      .update(usersTable)
      .set({
        notesUsed: sql`GREATEST(${usersTable.notesUsed} - 1, 0)`,
      })
      .where(eq(usersTable.id, userId));

    revalidateTag(CACHE_TAGS.notes(userId));
    revalidateTag(CACHE_TAGS.usage_details(userId));

    return { success: true };
  } catch (error) {
    console.log("[DELETE_NOTE]", error);
    return { success: false, message: "INTERNAL_ERROR" };
  }
}
