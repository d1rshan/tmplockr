"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteNote } from "@/features/dashboard/actions/notes";
import { File } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Copy, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function FilesCard({ files }: { files: File[] }) {
  const [deletingFileId, setDeletingFileId] = useState("");

  async function handleDelete(fileId: string) {
    setDeletingFileId(fileId);
    const res = await deleteNote(fileId);
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
      <CardContent className="uppercase flex flex-col gap-1 h-30 overflow-y-scroll scrollbar-hide ">
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
              <Button
                size={"icon"}
                onClick={() => handleDelete(file.id!)}
                variant={"custom"}
                disabled={deletingFileId === file.id}
              >
                <Trash className="size-3.5 text-destructive" />
              </Button>
              <Button size={"icon"} variant={"custom"}>
                <Copy className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
