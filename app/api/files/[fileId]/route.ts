import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { imagekit } from "../route";
import { auth } from "@clerk/nextjs/server";
import { filesTable } from "@/lib/db/schema";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const body = await req.json();
    const { fileId, imagekitId } = body;

    imagekit.deleteFile(imagekitId, function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    });

    const res = await db
      .delete(filesTable)
      .where(and(eq(filesTable.userId, userId), eq(filesTable.id, fileId)))
      .returning();

    if (res.length === 0) {
      return new NextResponse("File Not Found", { status: 400 });
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("[FILES_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
