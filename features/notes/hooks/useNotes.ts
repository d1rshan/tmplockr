import { useQuery } from "@tanstack/react-query";

import { getNotes } from "../queries";

export const useNotes = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
};
