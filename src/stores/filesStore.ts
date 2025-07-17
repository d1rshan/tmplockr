import { create } from "zustand";
import { File } from "@/lib/db/schema";
import axios from "axios";
import { toast } from "sonner";

interface FilesState {
  files: File[]; // here File represents the drizzle's File schema
  isDeletingFile: boolean;
  addFile: ({
    fileName,
    fileSize,
    fileType,
    publicId,
  }: {
    fileName: string;
    fileSize: number;
    fileType: string;
    publicId: string;
  }) => Promise<void>;
  //   deleteFile: (file: File) => Promise<void>;
  fetchFiles: () => Promise<void>;
}

export const useFilesStore = create<FilesState>((set) => ({
  files: [],
  isDeletingFile: false,
  addFile: async ({ fileName, fileSize, fileType, publicId }) => {
    try {
      // const { fileName, fileSize, fileType, publicId } = body;
      const res = await axios.post("/api/files", {
        fileName,
        fileSize,
        fileType,
        publicId,
      });

      if (res.status === 201) {
        set((state) => ({
          files: [...state.files, res.data],
        }));
      }
    } catch (error) {
      toast.error("Failed to save file");
      console.log("error", error);
    }
  },
  fetchFiles: async () => {
    try {
      const res = await axios.get("/api/files");
      set({ files: res.data });
      toast.success("Fetched all files");
    } catch (error) {
      console.log("Error fetching files from neondb", error);
      toast.error("Failed to fetch files");
    }
  },
}));
