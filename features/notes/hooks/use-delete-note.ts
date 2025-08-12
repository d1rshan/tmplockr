import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Note, NoteUser, User } from "@/types";

import { deleteNote } from "../queries";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId }: { noteId: string }) => deleteNote(noteId),

    onSuccess: (data: NoteUser) => {
      queryClient.setQueryData<Note[]>(["notes"], (prev) =>
        prev?.filter((item) => item.id != data.note.id)
      );
      queryClient.setQueryData<User>(["user"], () => data.user);
      toast.success("Note Deleted");
    },
  });
};
