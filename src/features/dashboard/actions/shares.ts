"use server";

import { ActionResponse } from "@/types";
import { shareSchema } from "../schemas";
import z from "zod";
import { db } from "@/lib/db";
import { codesTable, sharedFilesNotesTable, usersTable } from "@/lib/db/schema";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/features/auth/hooks/auth";
import { APP_LIMITS } from "@/lib/consts";

export async function createShare(
  unsafeData: z.infer<typeof shareSchema>
): ActionResponse {
  try {
    const userId = await auth();
    if (!userId) {
      return { success: false, message: "UNAUTHORIZED" };
    }

    const parsed = shareSchema.safeParse(unsafeData);
    if (!parsed.success) {
      return { success: false, message: "VALIDATION_FAILED" };
    }

    const { notes, files } = parsed.data;

    if (notes.length === 0 && files.length === 0) {
      return { success: false, message: "VALIDATION_FAILED" };
    }

    const [{ sharesUsed }] = await db
      .select({ sharesUsed: usersTable.sharesUsed })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (sharesUsed + 1 > APP_LIMITS.SHARES) {
      return { success: false, message: "USAGE_LIMIT_EXCEEDED" };
    }

    await db.transaction(async (tx) => {
      // generate a unique 4-digit code
      let code: number;
      while (true) {
        code = Math.floor(1000 + Math.random() * 9000);
        const existing = await tx
          .select()
          .from(codesTable)
          .where(eq(codesTable.code, code))
          .limit(1);

        if (existing.length === 0) break;
      }

      await tx.insert(codesTable).values({
        code,
        userId,
      });

      const rows = [];

      for (const fileId of files) {
        rows.push({
          code,
          file_id: fileId,
        });
      }

      for (const noteId of notes) {
        rows.push({
          code,
          note_id: noteId,
        });
      }

      if (rows.length > 0) {
        await tx.insert(sharedFilesNotesTable).values(rows);
      }

      await tx
        .update(usersTable)
        .set({ sharesUsed: sharesUsed + 1 })
        .where(eq(usersTable.id, userId));
    });

    revalidateTag(CACHE_TAGS.shares(userId));
    revalidateTag(CACHE_TAGS.usage_details(userId));

    return { success: true };
  } catch (error) {
    console.error("[CREATE_SHARE]", error);
    return { success: false, message: "INTERNAL_ERROR" };
  }
}

export async function deleteShare(
  code: number
): ActionResponse {
  try {
    const userId = await auth();
    if (!userId) {
      return { success: false, message: "UNAUTHORIZED" };
    }

    const existing = await db
      .select({
        code: codesTable.code,
        userId: codesTable.userId,
      })
      .from(codesTable)
      .where(eq(codesTable.code, code))
      .limit(1);

    if (existing.length === 0) {
      return { success: false, message: "VALIDATION_FAILED" };
    }

    if (existing[0].userId !== userId) {
      return { success: false, message: "FORBIDDEN" };
    }


    await db.transaction(async (tx) => {
      // delete code → cascades to shared_files_notes
      await tx
        .delete(codesTable)
        .where(eq(codesTable.code, code));

      // decrement usage, never below 0
      await tx
        .update(usersTable)
        .set({
          sharesUsed: sql`GREATEST(${usersTable.sharesUsed} - 1, 0)`,
        })
        .where(eq(usersTable.id, userId));
    });

    revalidateTag(CACHE_TAGS.shares(userId));
    revalidateTag(CACHE_TAGS.usage_details(userId));

    return { success: true };
  } catch (error) {
    console.error("[DELETE_SHARE]", error);
    return { success: false, message: "INTERNAL_ERROR" };
  }
}
