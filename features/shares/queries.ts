import axios from "axios";

export const createShare = async (fileIds: string[], noteIds: string[]) => {
  const res = await axios.post("/api/shares", { fileIds, noteIds });
  return res.data;
};

export const getUserShares = async () => {
  const res = await axios.get("/api/shares");
  return res.data;
};
