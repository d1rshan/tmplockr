import { ActionResponse } from "@/types";
import { auth } from "@clerk/nextjs/server";
import z from "zod";
import { fileSchema } from "../schemas";
import { db } from "@/lib/db";
import { filesTable, usersTable } from "@/lib/db/schema";
import { APP_LIMITS } from "@/lib/consts";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { eq } from "drizzle-orm";

export async function saveFilesToDB(
  unsafeData: z.infer<typeof fileSchema>[]
): ActionResponse {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, message: "UNAUTHORIZED" };
    }

    const { success, data } = z.array(fileSchema).safeParse(unsafeData);

    if (!success) {
      return { success: false, message: "VALIDATION_FAILED" };
    }

    const [{ storageUsed }] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    const availableStorage = APP_LIMITS.STORAGE - storageUsed;

    const values = data.map((file) => ({
      userId,
      name: file.name,
      size: file.size,
      type: file.type,
      imagekitUrl: file.imagekitUrl,
      imagekitId: file.imagekitId,
    }));

    const totalSize = values.reduce((total, file) => total + file.size, 0);

    if (totalSize > availableStorage) {
      return { success: false, message: "USAGE_LIMIT_EXCEEDED" };
    }

    await db.insert(filesTable).values(values).returning();

    await db
      .update(usersTable)
      .set({ storageUsed: storageUsed + totalSize })
      .where(eq(usersTable.id, userId))
      .returning();

    revalidateTag(CACHE_TAGS.files(userId));
    revalidateTag(CACHE_TAGS.usage_details(userId));
    return { success: true };
  } catch (error) {
    console.log("[SAVE_FILES_TO_DB]", error);
    return { success: false, message: "INTERNAL_ERROR" };
  }
}
