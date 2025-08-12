import { useQuery } from "@tanstack/react-query";

import { getUser } from "../queries";
import { User } from "@/types";

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
