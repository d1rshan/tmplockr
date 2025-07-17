import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const body = await request.json();
    const { fileName, fileSize, fileType, publicId } = body;

    const newFile = await db
      .insert(files)
      .values({
        fileName,
        clerkUserId: userId,
        fileSize,
        fileType,
        publicId,
      })
      .returning();

    return NextResponse.json(newFile[0], { status: 201 });
  } catch (error) {
    console.log("Error saving file to neondb", error);
    return NextResponse.json(
      { error: "Failed to save file to neondb" },
      { status: 401 }
    );
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
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const res = await db
      .select()
      .from(files)
      .where(eq(files.clerkUserId, userId));

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("Error fetching files from neondb", error);
    return NextResponse.json(
      { error: "Error fetching files" },
      { status: 500 }
    );
  }
}
