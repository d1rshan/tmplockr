import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadFiles } from "../queries";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => uploadFiles(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
};
