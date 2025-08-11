"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  Loader2,
  UploadIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUploadFiles } from "@/features/files/hooks/useUploadFiles";

export const FileUploadTab = () => {
  const [progress, setProgress] = useState(0);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  // const { addFile } = useFilesStore();

  const { mutateAsync: uploadFiles, isPending: isUploading } = useUploadFiles();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setAcceptedFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  const handleRemoveFile = (index: number) => {
    setAcceptedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      toast.error("Please select file to upload");
      return;
    }

    const formData = new FormData();
    acceptedFiles.forEach((file) => formData.append("files", file));

    await uploadFiles({ formData });

    setAcceptedFiles([]);
    toast.success("Files Uploaded");
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center"
        {...getRootProps()}
      >
        <Input {...getInputProps()} onChange={handleFileChange} />

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
      <Button className="mt-2" onClick={handleUpload} disabled={isUploading}>
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
        <div className="rounded-md border">
          <div className="divide-y">
            {acceptedFiles.map((file, i) => (
              <div
                key={file.name}
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
                  onClick={() => handleRemoveFile(i)}
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
