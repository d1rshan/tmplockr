import { useQuery } from "@tanstack/react-query";

import { getFiles } from "../queries";
import { File } from "@/types";

export const useFiles = () => {
  return useQuery<File[]>({
    queryKey: ["files"],
    queryFn: getFiles,
  });
};
