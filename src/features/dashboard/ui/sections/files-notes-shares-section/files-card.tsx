"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Download, Link2, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { deleteFile } from "@/features/dashboard/actions/files";

export function FilesCard({ files }: { files: File[] }) {
  const [deletingFileId, setDeletingFileId] = useState("");

  // TODO: consider using useTransition hook
  async function handleDelete(fileId: string, imagekitId: string) {
    setDeletingFileId(fileId);
    const res = await deleteFile(fileId, imagekitId);
    if (res.success) {
      toast.success("FILE DELETED");
    } else {
      toast.error("FAILED TO DELETE FILE");
    }
    setDeletingFileId("");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>FILES</CardTitle>
      </CardHeader>
      <CardContent className="uppercase flex flex-col gap-2 h-40 overflow-y-scroll scrollbar-hide ">
        {files.map((file) => (
          <div
            key={file.id}
            className={cn(
              "flex justify-between items-center",
              deletingFileId === file.id && "opacity-40"
            )}
          >
            <span>{file.name}</span>
            <div className="flex gap-3 items-center justify-center">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href={file.imagekitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Link2 className="size-3.5" />
                </Link>
              </Button>
              <Button
                variant="custom"
                size="icon"
                onClick={() => {
                  saveAs(file.imagekitUrl, file.name);
                }}
              >
                <Download className="size-3.5" />
              </Button>

              <Button
                variant="custom"
                size="icon"
                onClick={() => handleDelete(file.id!, file.imagekitId)}
                disabled={deletingFileId === file.id}
              >
                <Trash className="size-3.5 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
