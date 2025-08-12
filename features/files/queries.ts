import axios from "axios";

import { File, FileUser } from "@/types";

export const getFiles = async () => {
  const res = await axios.get("/api/files");
  return res.data;
};

export const deleteFile = async (fileId: string, imagekitId: string) => {
  const res = await axios.delete(`/api/files/${fileId}`, {
    data: { imagekitId },
  });
  return res.data;
};

export const uploadFiles = async (uploadResults: File[]) => {
  const res = await axios.post("/api/files", { uploadResults });
  return res.data;
};
