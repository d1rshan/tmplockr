"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Download, Link2, Trash } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { deleteFile } from "@/features/dashboard/actions/files";

export function FilesCard({ files }: { files: File[] }) {
  const [deletingFileIds, setDeletingFileIds] = useState<Set<string>>(
    new Set()
  );
  const [isPending, startTransition] = useTransition(); // React 18 transition

  async function handleDelete(fileId: string, imagekitId: string) {
    // Add file to deleting set immediately for instant UI feedback
    setDeletingFileIds((prev) => new Set(prev).add(fileId));

    try {
      const res = await deleteFile(fileId, imagekitId);

      if (res.success) {
        toast.success("FILE DELETED");

        // Non-urgent removal from deleting set so UI stays responsive
        startTransition(() => {
          setDeletingFileIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(fileId);
            return newSet;
          });
        });
      } else {
        toast.error("FAILED TO DELETE FILE");
        setDeletingFileIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      }
    } catch (err) {
      toast.error("FAILED TO DELETE FILE");
      setDeletingFileIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>FILES</CardTitle>
      </CardHeader>
      <CardContent className="uppercase flex flex-col gap-2 h-40 overflow-y-scroll scrollbar-hide ">
        {files.map((file) => (
          <div
            key={file.id}
            className={cn(
              "flex justify-between items-center",
              deletingFileIds.has(file.id!) && "opacity-40"
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
                disabled={deletingFileIds.has(file.id!)}
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
