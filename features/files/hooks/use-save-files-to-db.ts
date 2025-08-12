import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { File, FileUser, User } from "@/types";

import { uploadFiles } from "../queries";

export const useSaveFilesToDB = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uploadResults }: { uploadResults: File[] }) =>
      uploadFiles(uploadResults),

    onSuccess: (data: FileUser) => {
      queryClient.setQueryData<File[]>(["files"], (prev) =>
        prev ? [...prev, ...data.files!] : [...data.files!]
      );
      queryClient.setQueryData<User>(["user"], () => data.user);
      toast.success("Files Uploaded");
    },
  });
};
