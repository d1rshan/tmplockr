import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

import { auth } from "@clerk/nextjs/server";
import { filesTable, usersTable } from "@/lib/db/schema";
import { db } from "@/lib/db";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: "https://ik.imagekit.io/d1rsh/",
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params;
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const { imagekitId } = await req.json();

    imagekit.deleteFile(imagekitId, function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    });

    const [file] = await db
      .delete(filesTable)
      .where(and(eq(filesTable.userId, userId), eq(filesTable.id, fileId)))
      .returning();

    if (!file) {
      return new NextResponse("File Not Found", { status: 400 });
    }

    await db
      .update(usersTable)
      .set({ storageUsed: sql`${usersTable.storageUsed} - ${file.size}` })
      .where(eq(usersTable.id, userId));

    return NextResponse.json(file);
  } catch (error) {
    console.error("[FILES_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
