import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { File } from "@/types";

import { uploadFiles } from "../queries";

export const useSaveFilesToDB = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uploadResults }: { uploadResults: File[] }) =>
      uploadFiles(uploadResults),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("Saved Files To DB");
    },
  });
};
