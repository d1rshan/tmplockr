import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { filesTable, usersTable } from "@/lib/db/schema";
import { File } from "@/types";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return new NextResponse("User Missing In Table", { status: 400 });
    }

    const LIMIT = 100 * 1024 * 1024;
    const storageUsed = user.storageUsed;
    const availableStorage = LIMIT - storageUsed;

    const { uploadResults } = (await req.json()) as { uploadResults: File[] };

    const values = uploadResults.map((file) => ({
      userId,
      name: file.name,
      size: file.size,
      type: file.type,
      imagekitUrl: file.imagekitUrl,
      imagekitId: file.imagekitId,
    }));

    const totalSize = values.reduce((total, file) => total + file.size, 0);

    if (totalSize > availableStorage) {
      return new NextResponse("Upload Size Exceeds Storage Limit", {
        status: 400,
      });
    }

    const files = await db.insert(filesTable).values(values).returning();

    const updatedStorageUsed = storageUsed + totalSize;

    const [updatedUser] = await db
      .update(usersTable)
      .set({ storageUsed: updatedStorageUsed })
      .where(eq(usersTable.id, userId))
      .returning();

    return NextResponse.json({ files, user: updatedUser });
  } catch (error) {
    console.log("[FILES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const files = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.userId, userId));

    return NextResponse.json(files);
  } catch (error) {
    console.error("[FILES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
