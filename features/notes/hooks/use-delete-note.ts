import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNote } from "../queries";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId }: { noteId: string }) => deleteNote(noteId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
