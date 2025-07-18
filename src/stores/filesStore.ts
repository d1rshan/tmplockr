import { create } from "zustand";
import { File } from "@/lib/db/schema";
import axios from "axios";
import { toast } from "sonner";

interface FilesState {
  files: File[]; // here File represents the drizzle's File schema
  isDeletingFile: number | null;
  addFile: ({
    fileName,
    fileSize,
    fileType,
    imagekitUrl,
    imagekitId,
  }: {
    fileName: string;
    fileSize: number;
    fileType: string;
    imagekitUrl: string;
    imagekitId: string;
  }) => Promise<void>;
  deleteFile: (fileId: number, publicId: string) => Promise<void>;
  fetchFiles: () => Promise<void>;
}

export const useFilesStore = create<FilesState>((set) => ({
  files: [],
  isDeletingFile: null,
  addFile: async ({
    fileName,
    fileSize,
    fileType,
    imagekitId,
    imagekitUrl,
  }) => {
    try {
      const res = await axios.post("/api/files", {
        fileName,
        fileSize,
        fileType,
        imagekitId,
        imagekitUrl,
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
  deleteFile: async (fileId, imagekitId) => {
    set({ isDeletingFile: fileId });
    try {
      const res = await axios.delete("/api/files", {
        data: { fileId, imagekitId },
      });

      if (res.status === 201) {
        set((state) => ({
          files: state.files.filter((file) => file.id !== fileId),
        }));
        toast.success("Deleted file");
      } else {
        toast.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Unknown error occured");
    } finally {
      set({ isDeletingFile: null });
    }
  },
}));
