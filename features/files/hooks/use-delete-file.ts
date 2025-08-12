import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFile } from "../queries";

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fileId,
      imagekitId,
    }: {
      fileId: string;
      imagekitId: string;
    }) => deleteFile(fileId, imagekitId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
