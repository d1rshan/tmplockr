import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { users, files as filesDB } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResponse {
  public_id: string;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1);

    const user = result[0];
    const storageUsed = user?.storageUsed || 0;
    const userStorageLeftBytes = 100 * 1024 * 1024 - storageUsed;

    if (!user || result.length === 0) {
      await db.insert(users).values({
        clerkUserId: userId,
      });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files found" }, { status: 400 });
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > userStorageLeftBytes) {
      return NextResponse.json(
        {
          error: `Total upload size exceeds storage limit (${(
            userStorageLeftBytes /
            (1024 * 1024)
          ).toFixed(1)}MB)`,
        },
        { status: 400 }
      );
    }

    const publicIds: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise<CloudinaryUploadResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "test" }, (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResponse);
            })
            .end(buffer);
        }
      );

      publicIds.push(result.public_id);

      // store each file info
      await db.insert(filesDB).values({
        clerkUserId: userId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        publicId: result.public_id,
      });
    }

    // Update storage left for user
    const updatedSizeForUser = storageUsed + totalSize;
    await db
      .update(users)
      .set({ storageUsed: updatedSizeForUser })
      .where(eq(users.clerkUserId, userId));

    return NextResponse.json({ publicIds }, { status: 200 });
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    return NextResponse.json({ error: "Upload failed!" }, { status: 500 });
  }
}
