import { eq, and } from "drizzle-orm";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: "https://ik.imagekit.io/d1rsh/",
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const body = await req.json();
    const { fileName, fileSize, fileType, imagekitId, imagekitUrl } = body;

    const newFile = await db
      .insert(files)
      .values({
        fileName,
        clerkUserId: userId,
        fileSize,
        fileType,
        imagekitId,
        imagekitUrl,
      })
      .returning();

    return NextResponse.json(newFile[0]);
  } catch (error) {
    console.log("[FILES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 400 });
//     }

//     const result = await db
//       .select()
//       .from(users)
//       .where(eq(users.clerkUserId, userId))
//       .limit(1);

//     const user = result[0];
//     const storageUsed = user?.storageUsed || 0;
//     const userStorageLeftBytes = 100 * 1024 * 1024 - storageUsed;

//     if (!user || result.length === 0) {
//       await db.insert(users).values({
//         clerkUserId: userId,
//       });
//     }

//     const formData = await request.formData();
//     const files = formData.getAll("files") as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json({ error: "No files found" }, { status: 400 });
//     }

//     const totalSize = files.reduce((sum, file) => sum + file.size, 0);
//     if (totalSize > userStorageLeftBytes) {
//       return NextResponse.json(
//         {
//           error: `Total upload size exceeds storage limit (${(
//             userStorageLeftBytes /
//             (1024 * 1024)
//           ).toFixed(1)}MB)`,
//         },
//         { status: 400 }
//       );
//     }

//     for (const file of files){
//       // store each file info
//       await db.insert(filesDB).values({
//         clerkUserId: userId,
//         fileName: file.name,
//         fileSize: file.size,
//         fileType: file.type,
//         publicId: ,
//       });
//     }

//     }

//     // Update storage left for user
//     // const updatedSizeForUser = storageUsed + totalSize;
//     // await db
//     //   .update(users)
//     //   .set({ storageUsed: updatedSizeForUser })
//     //   .where(eq(users.clerkUserId, userId));

//     return NextResponse.json({  }, { status: 200 });
//   } catch (error) {
//     console.error("Error uploading files to Cloudinary:", error);
//     return NextResponse.json({ error: "Upload failed!" }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const res = await db
      .select()
      .from(files)
      .where(eq(files.clerkUserId, userId));

    return NextResponse.json(res);
  } catch (error) {
    console.error("[FILES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Not Authorized", { status: 401 });
    }

    const body = await request.json();
    const { fileId, imagekitId } = body;

    imagekit.deleteFile(imagekitId, function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    });

    const res = await db
      .delete(files)
      .where(and(eq(files.clerkUserId, userId), eq(files.id, fileId)))
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
