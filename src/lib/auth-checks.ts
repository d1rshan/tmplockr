import "server-only";

import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySessionRedirect = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return userId;
});
