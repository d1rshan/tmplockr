"use client";

import { useUpload } from "@/hooks/use-upload";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  Loader2,
  UploadIcon,
  X,
} from "lucide-react";

export const FileUploadTab = () => {
  const {
    acceptedFiles,
    setAcceptedFiles,
    isUploading,
    progress,
    uploadFiles,
    removeFile,
  } = useUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => setAcceptedFiles((prev) => [...prev, ...files]),
  });

  return (
    <>
      <div
        className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center"
        {...getRootProps()}
      >
        <Input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <div className="bg-slate-100 p-3 rounded-full">
            <UploadIcon className="h-6 w-6 text-slate-600" />
          </div>
          <h3 className="font-medium text-slate-900">
            {isDragActive
              ? " Drop the files here ..."
              : "Drag drop some files here, or click to select files"}
          </h3>
          <p className="text-sm text-slate-500">
            Support for documents, PDFs, and more
          </p>
        </div>
      </div>

      <Button className="mt-2" onClick={uploadFiles} disabled={isUploading}>
        {isUploading ? <Loader2 className="animate-spin" /> : "Upload"}
      </Button>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm text-slate-500">
              {progress.toFixed(0)}%
            </span>
          </div>
          <Progress value={progress} max={100} />
        </div>
      )}

      {acceptedFiles.length > 0 && (
        <div className="rounded-md border mt-4">
          <div className="divide-y">
            {acceptedFiles.map((file, i) => (
              <div
                key={file.name + i}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded">
                    {file.type.includes("image") ? (
                      <ImageIcon />
                    ) : file.type.includes("txt") ? (
                      <FileTextIcon />
                    ) : (
                      <FileIcon />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-slate-500 truncate max-w-md">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(i)}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
