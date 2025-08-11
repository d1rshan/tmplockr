import axios from "axios";

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

export const uploadFiles = async (formData: FormData) => {
  const res = await axios.post("/api/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
