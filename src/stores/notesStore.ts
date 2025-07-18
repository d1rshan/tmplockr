import { create } from "zustand";
import { Note } from "@/lib/db/schema";
import axios from "axios";
import { toast } from "sonner";

interface NotesState {
  notes: Note[];
  isSaving: boolean;
  isDeletingNote: number | null;
  addNote: ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => Promise<void>;
  deleteNote: (noteId: number) => Promise<void>;
  fetchNotes: () => Promise<void>;
}

// 2. Create the store
export const useNotesStore = create<NotesState>((set) => ({
  // --- STATE ---
  notes: [],
  isSaving: false,
  isDeletingNote: null,

  // --- ACTIONS ---
  addNote: async ({ title, content }) => {
    set({ isSaving: true });
    try {
      const res = await axios.post("/api/notes", { title, content });
      if (res.status === 201) {
        set((state) => ({
          notes: [...state.notes, res.data],
        }));
        toast.success("Note saved");
      } else {
        toast.error("Failed to save note");
      }
    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error("Unknown error occured");
    } finally {
      set({ isSaving: false });
    }
  },

  // Action to delete a note
  deleteNote: async (noteId) => {
    set({ isDeletingNote: noteId });

    try {
      const res = await axios.delete("/api/notes", {
        data: { noteId },
      });

      if (res.status === 201) {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== noteId),
        }));
        toast.success("Deleted note");
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Unknown error occured");
    } finally {
      set({ isDeletingNote: null });
    }
  },
  fetchNotes: async () => {
    const res = await axios.get("/api/notes");

    if (res.status === 201) {
      set({ notes: res.data });
      toast.success("Fetched all notes");
    } else {
      toast.error("Failed to fetch notes");
    }
  },
}));
