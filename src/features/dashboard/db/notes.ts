import { cacheTags } from "@/lib/cache-tags";
import { db } from "@/lib/db";
import { notesTable, type Note } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getNotes(userId: string): Promise<Note[]> {
  "use cache";
  cacheTag(cacheTags.notes);

  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.userId, userId));

  console.log("HIT BROTHA");

  return notes;
}
