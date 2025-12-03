import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { CACHE_TAGS } from "@/lib/cache-tags";
import { db } from "@/lib/db";
import {
  type Code,
  codesTable,
  type File,
  filesTable,
  notesTable,
  sharedFilesNotesTable,
  usersTable,
  type Note,
} from "@/lib/db/schema";

export async function getNotes(userId: string): Promise<Note[]> {
  "use cache";
  cacheTag(CACHE_TAGS.notes(userId));

  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.userId, userId));

  console.log("GET NOTES HIT");
  return notes;
}

export async function getFiles(userId: string): Promise<File[]> {
  "use cache";
  cacheTag(CACHE_TAGS.files(userId));

  const files = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.userId, userId));

  console.log("GET FILES HIT");
  return files;
}


export async function getShares(userId: string): Promise<Code[]> {
  "use cache";
  cacheTag(CACHE_TAGS.shares(userId));

  const codes = await db
    .select()
    .from(codesTable)
    .where(eq(codesTable.userId, userId));

  console.log("GET SHARES HIT");
  return codes;
}

export async function getUsageDetails(userId: string) {
  "use cache";
  cacheTag(CACHE_TAGS.usage_details(userId));

  const [usage_details] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  console.log("GET USAGE DETAILS HIT");
  return usage_details;
}

export async function recieve(code: number) {
  const existing = await db
    .select({ code: codesTable.code })
    .from(codesTable)
    .where(eq(codesTable.code, code))
    .limit(1);

  if (existing.length === 0) {
    return null
  }

  const files = await db
    .select({
      id: filesTable.id,
      userId: filesTable.userId,
      name: filesTable.name,
      size: filesTable.size,
      type: filesTable.type,
      imagekitUrl: filesTable.imagekitUrl,
      imagekitId: filesTable.imagekitId,
      uploadedAt: filesTable.uploadedAt,
    })
    .from(sharedFilesNotesTable)
    .innerJoin(
      filesTable,
      eq(sharedFilesNotesTable.file_id, filesTable.id)
    )
    .where(eq(sharedFilesNotesTable.code, code));

  const notes = await db
    .select({
      id: notesTable.id,
      userId: notesTable.userId,
      title: notesTable.title,
      content: notesTable.content,
      createdAt: notesTable.createdAt
    })
    .from(sharedFilesNotesTable)
    .innerJoin(
      notesTable,
      eq(sharedFilesNotesTable.note_id, notesTable.id)
    )
    .where(eq(sharedFilesNotesTable.code, code));

  return { files, notes }
}
