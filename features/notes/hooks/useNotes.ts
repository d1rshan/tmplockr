import { useQuery } from "@tanstack/react-query";

import { getNotes } from "../queries";
import { Note } from "@/types";

export const useNotes = () => {
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
};
