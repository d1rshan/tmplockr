import { eq } from "drizzle-orm";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { filesTable, usersTable } from "@/lib/db/schema";
import axios from "axios";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: "https://ik.imagekit.io/d1rsh/",
});

// export async function PATCH(req: Request) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return new NextResponse("Not Authorized", { status: 401 });
//     }

//     const body = await req.json();
//     const { name, size, type, imagekitId, imagekitUrl } = body;

//     const [file] = await db
//       .insert(filesTable)
//       .values({
//         name,
//         userId,
//         size,
//         type,
//         imagekitId,
//         imagekitUrl,
//       })
//       .returning();

//     return NextResponse.json(file);
//   } catch (error) {
//     console.log("[FILES_POST]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

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

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    console.log(filesTable);

    if (!files || files.length === 0) {
      return new NextResponse("Files Missing", { status: 400 });
    }
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    console.log("TOTAL SIZE:", totalSize);

    if (totalSize > availableStorage) {
      return new NextResponse("Upload Size Exceeds Storage Limit", {
        status: 400,
      });
    }

    const results = await Promise.all(
      files.map(async (file) => {
        // file is a native File object
        const uploadForm = new FormData();
        uploadForm.append("file", file, file.name);
        uploadForm.append("fileName", file.name);

        const res = await axios.post(
          "https://upload.imagekit.io/api/v1/files/upload",
          uploadForm, // ✅ FormData goes here
          {
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY + ":").toString(
                  "base64"
                ),
              // ...uploadForm.getHeaders?.(), // Node.js FormData needs explicit headers
            },
          }
        );

        await db.insert(filesTable).values({
          userId,
          name: file.name,
          size: file.size,
          type: file.type,
          imagekitId: res.data.fileId,
          imagekitUrl: res.data.url,
        });
        return res.data;
      })
    );

    console.log(results);

    const updatedStorageUsed = storageUsed + totalSize;
    await db
      .update(usersTable)
      .set({ storageUsed: updatedStorageUsed })
      .where(eq(usersTable.id, userId));

    // console.log(results);
    return NextResponse.json(results);
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
