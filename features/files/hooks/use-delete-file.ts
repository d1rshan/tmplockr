import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { File, FileUser, User } from "@/types";

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

    onSuccess: (data: FileUser) => {
      queryClient.setQueryData<File[]>(["files"], (prev) =>
        prev?.filter((item) => item.id != data.file!.id)
      );
      queryClient.setQueryData<User>(["user"], () => data.user);
      toast.success("File Deleted");
    },
  });
};
