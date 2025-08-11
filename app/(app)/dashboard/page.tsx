import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { notesTable } from "@/lib/db/schema";
import { getQueryClient } from "@/lib/utils";
import { db } from "@/lib/db";

import { SignoutButton } from "./_components/signout-button";
import { UploadCard } from "./_components/upload-card";
import { YourUploadsCard } from "./_components/your-uploads-card";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const notes = await db
        .select()
        .from(notesTable)
        .where(eq(notesTable.userId, userId));

      return notes;
    },
  });
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">Tmplockr</h1>
            </div>
            <SignoutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6">
          <UploadCard />
          <YourUploadsCard />
        </div>
      </main>
    </div>
  );
}
