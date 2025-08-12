"use client";

import { toast } from "sonner";
import { createContext, useContext, useState, ReactNode } from "react";
import { upload } from "@imagekit/next";

import { useSaveFilesToDB } from "@/features/files/hooks/use-save-files-to-db";

type UploadContextType = {
  acceptedFiles: File[];
  setAcceptedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isUploading: boolean;
  progress: number;
  uploadFiles: () => Promise<void>;
  removeFile: (index: number) => void;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

// TODO: CHECK USAGE DETAILS AND PREVENT FILE UPLOADS IF STORAGE LIMIT EXCEEDS

export function UploadProvider({ children }: { children: ReactNode }) {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { mutateAsync: saveFilesToDB } = useSaveFilesToDB();

  const authenticator = async () => {
    const response = await fetch("/api/imagekit-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Authentication failed: ${response.status} - ${errorText}`
      );
    }
    return response.json() as Promise<{
      signature: string;
      expire: number;
      token: string;
      publicKey: string;
    }>;
  };

  const uploadFiles = async () => {
    if (acceptedFiles.length === 0) {
      toast.error("Please select file to upload");
      return;
    }

    setIsUploading(true);

    try {
      // Upload all files concurrently
      const uploadResults = await Promise.all(
        acceptedFiles.map(async (file) => {
          const { signature, expire, token, publicKey } = await authenticator();

          try {
            const res = await upload({
              expire,
              token,
              signature,
              publicKey,
              file,
              fileName: file.name,
              onProgress: (event) => {
                setProgress((event.loaded / event.total) * 100);
              },
            });

            toast.success(`${file.name} Uploaded`);

            return {
              name: file.name,
              size: file.size,
              type: file.type,
              imagekitId: res.fileId!,
              imagekitUrl: res.url!,
            };
          } catch (error) {
            toast.error(`Failed To Upload ${file.name}`);
            console.error(`Upload failed for ${file.name}`, error);
            return null; // or you could return { error: true, fileName: file.name }
          }
        })
      );

      // Filter out failed uploads (nulls) before sending to backend
      const successfulResults = uploadResults.filter((r) => r !== null);

      await saveFilesToDB({ uploadResults: successfulResults });

      setAcceptedFiles([]);
    } catch (error) {
      toast.error("Authentication failed");
      console.error(error);
    } finally {
      setProgress(0);
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setAcceptedFiles((files) => files.filter((_, i) => i !== index));
  };

  return (
    <UploadContext.Provider
      value={{
        acceptedFiles,
        setAcceptedFiles,
        isUploading,
        progress,
        uploadFiles,
        removeFile,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
}
