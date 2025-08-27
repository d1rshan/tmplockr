import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShare } from "../queries";

export const useCreateShare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fileIds,
      noteIds,
    }: {
      fileIds: string[];
      noteIds: string[];
    }) => createShare(fileIds, noteIds),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shares"] });
      toast.success("Share Created!");
    },
    // onSuccess: (data: NoteUser) => {
    //     queryClient.
    //   queryClient.setQueryData<Note[]>(["notes"], (prev) =>
    //     prev ? [...prev, data.note] : [data.note]
    //   );
    //   queryClient.setQueryData<User>(["user"], () => data.user);
    //   toast.success("Note Created");
    // },
  });
};
