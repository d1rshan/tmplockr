import axios from "axios";

export const getNotes = async () => {
  const res = await axios.get(`/api/notes`);
  return res.data;
};

export const createNote = async (title: string, content: string) => {
  const res = await axios.post(`/api/notes`, { title, content });
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete(`/api/notes/${noteId}`);
  return res.data;
};
