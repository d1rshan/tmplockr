"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardAction,
} from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import { UploadProvider, useUpload } from "./use-upload";
import { cn, toMB } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Plus, Upload, X } from "lucide-react";
import { useState } from "react";

function Component() {
  const [showDropzone, setShowDropzone] = useState(false);

  const {
    acceptedFiles,
    setAcceptedFiles,
    isUploading,
    progress,
    uploadFiles,
  } = useUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => setAcceptedFiles((prev) => [...prev, ...files]),
  });

  const totalSize = toMB(
    acceptedFiles.reduce((acc, file) => acc + file.size, 0)
  );

  return (
    <Card className="sm:col-span-4">
      <CardHeader>
        <CardTitle>UPLOAD FILES</CardTitle>
        <CardDescription className="text-muted-foreground">
          {isUploading
            ? "UPLOADING..."
            : `${acceptedFiles.length} FILES SELECTED, ${totalSize} MB TOTAL`}
        </CardDescription>
        <CardAction className="flex gap-2">
          {/* only show "add more" if files already exist */}
          {acceptedFiles.length > 0 && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowDropzone((prev) => !prev)}
            >
              {showDropzone ? (
                <Check className="size-4" />
              ) : (
                <Plus className="size-4" />
              )}
            </Button>
          )}
          {acceptedFiles.length > 0 && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setAcceptedFiles([]);
                setShowDropzone(false);
              }}
            >
              <X className="size-4" />
            </Button>
          )}
        </CardAction>
      </CardHeader>

      <CardContent>
        {acceptedFiles.length === 0 ? (
          // initial state (no files)
          <div
            {...getRootProps()}
            className={cn(
              "h-20 border-2 border-dashed rounded-md",
              "flex justify-center items-center cursor-pointer subtle-stripes",
              isDragActive && "border-solid"
            )}
          >
            {isDragActive ? "DROP HERE!" : "DRAG FILES OR CLICK HERE"}
            <input {...getInputProps()} />
          </div>
        ) : showDropzone ? (
          // user clicked the plus button → open dropzone again
          <div
            {...getRootProps()}
            className={cn(
              "h-20 border-2 border-dashed rounded-md",
              "flex justify-center items-center cursor-pointer subtle-stripes",
              isDragActive && "border-solid"
            )}
          >
            {isDragActive ? "DROP HERE!" : "ADD MORE FILES"}
            <input {...getInputProps()} />
          </div>
        ) : (
          // files selected, but not adding more
          <div
            className="h-20 flex gap-2 justify-center cursor-pointer border-2 items-center rounded-md bg-border/10 hover:bg-border/20"
            onClick={uploadFiles}
          >
            {isUploading ? (
              <div>{progress} %</div>
            ) : (
              // <Loader2 className="size-4 animate-spin" />
              <>
                <p>UPLOAD</p>
                <Upload className="size-4 mb-[4px]" />
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function UploadFilesCard() {
  return (
    <UploadProvider>
      <Component />
    </UploadProvider>
  );
}
