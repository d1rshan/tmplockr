import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { NoteUser, Note, User } from "@/types";

import { createNote } from "../queries";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createNote(title, content),

    onSuccess: (data: NoteUser) => {
      queryClient.setQueryData<Note[]>(["notes"], (prev) =>
        prev ? [...prev, data.note] : [data.note]
      );
      queryClient.setQueryData<User>(["user"], () => data.user);
      toast.success("Note Created");
    },
  });
};
