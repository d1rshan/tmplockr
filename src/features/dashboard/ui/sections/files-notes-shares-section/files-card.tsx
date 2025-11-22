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
      <CardContent className="uppercase flex flex-col gap-3 h-80 overflow-y-scroll scrollbar-hide">
        {files.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            NO FILES YET
          </div>
        ) : (
          files.map((file, index) => (
            <FileItem key={file.id} file={file} index={index + 1} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function FileItem({ file, index }: { file: File; index: number }) {
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
        "group relative border border-border rounded-lg p-3 hover:bg-accent/50 transition-all duration-200",
        isPending && "opacity-40"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground">
          {index.toString().padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            File • {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
            <Link
              href={file.imagekitUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link2 className="size-3" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              saveAs(file.imagekitUrl, file.name);
            }}
          >
            <Download className="size-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash className="size-3 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}
