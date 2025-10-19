import "server-only";

import { auth } from "@/features/auth/hooks/auth";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const userId = await auth();

  if (!userId) {
    redirect("/");
  }

  return userId;
});
