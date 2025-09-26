import { CACHE_TAGS } from "@/lib/cache-tags";
import { db } from "@/lib/db";
import {
  File,
  filesTable,
  notesTable,
  usersTable,
  type Note,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getNotes(userId: string): Promise<Note[]> {
  "use cache";
  cacheTag(CACHE_TAGS.notes(userId));

  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.userId, userId));

  return notes;
}

export async function getFiles(userId: string): Promise<File[]> {
  "use cache";
  cacheTag(CACHE_TAGS.files(userId));

  const files = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.userId, userId));

  return files;
}

export async function getUsageDetails(userId: string) {
  "use cache";
  cacheTag(CACHE_TAGS.usage_details(userId));

  const [usage_details] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return usage_details;
}
