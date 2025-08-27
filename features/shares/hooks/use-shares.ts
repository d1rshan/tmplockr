import { useQuery } from "@tanstack/react-query";

import { getUserShares } from "../queries";
import { Share } from "@/types";

export const useUserShares = () => {
  return useQuery<Share[]>({
    queryKey: ["shares"],
    queryFn: getUserShares,
  });
};
