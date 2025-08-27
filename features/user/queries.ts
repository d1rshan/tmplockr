import axios from "axios";

export const getUser = async () => {
  const res = await axios.get("/api/user");
  return res.data;
};

export const shareFilesNotes = async (fileIds: string[], noteIds: string[]) => {
  const res = await axios.post("/api/share", { fileIds, noteIds });
  return res.data;
};
