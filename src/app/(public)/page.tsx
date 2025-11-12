import { redirect } from "next/navigation";

import { auth } from "@/features/auth/hooks/auth";
import { HomeView } from "@/features/home/ui/views/home-view";

export default async function HomePage() {
  const user = await auth()
  if (user) return redirect("/dashboard")
  return <HomeView />;
}
