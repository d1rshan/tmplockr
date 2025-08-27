import axios from "axios";

export const shareFilesNotes = async (fileIds: string[], noteIds: string[]) => {
  const res = await axios.post("/api/shares", { fileIds, noteIds });
  return res.data;
};

export const getSharesOfUser = async () => {
  const res = await axios.get("/api/shares");
  return res.data;
};
