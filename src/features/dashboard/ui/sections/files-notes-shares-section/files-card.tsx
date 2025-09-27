"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Download, Link2, Trash } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { deleteFile } from "@/features/dashboard/actions/files";

export function FilesCard({ files }: { files: File[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>FILES</CardTitle>
      </CardHeader>
      <CardContent className="uppercase flex flex-col gap-2 h-40 overflow-y-scroll scrollbar-hide ">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </CardContent>
    </Card>
  );
}

function FileItem({ file }: { file: File }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteFile(file.id!, file.imagekitId);
        if (res.success) toast.success("FILE DELETED");
        else toast.error("FAILED TO DELETE FILE");
      } catch {
        toast.error("FAILED TO DELETE FILE");
      }
    });
  };

  return (
    <div
      className={cn(
        "flex justify-between items-center",
        isPending && "opacity-40"
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
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash className="size-3.5 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
