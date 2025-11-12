import { redirect } from "next/navigation";

import { auth } from "@/features/auth/hooks/auth";
import { DashboardView } from "@/features/dashboard/ui/views/dashboard-view";

export default async function DashboardPage() {
  const user = await auth()
  if (!user) return redirect("/")
  return <DashboardView />;
}
