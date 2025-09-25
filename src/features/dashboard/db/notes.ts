import { db } from "@/lib/db";
import { notesTable } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getNotes(): Promise<(typeof notesTable.$inferSelect)[]> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.userId, userId));

  console.log("HIT BROTHA");

  return notes;
}
