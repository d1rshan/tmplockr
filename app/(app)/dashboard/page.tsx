import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

import { filesTable, notesTable, usersTable } from "@/lib/db/schema";
import { getQueryClient } from "@/lib/utils";
import { db } from "@/lib/db";

import { SignoutButton } from "./_components/signout-button";
import { UploadCard } from "./_components/upload-card";
import { YourUploadsCard } from "./_components/your-uploads-card";
import { UserCard } from "./_components/user-card";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.id, userId));

        if (!user) {
          const [user] = await db
            .insert(usersTable)
            .values({ id: userId, storageUsed: 0, notesUsed: 0 })
            .returning();
          return user;
        }

        return user;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["notes"],
      queryFn: async () => {
        return await db
          .select()
          .from(notesTable)
          .where(eq(notesTable.userId, userId));
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["files"],
      queryFn: async () => {
        return await db
          .select()
          .from(filesTable)
          .where(eq(filesTable.userId, userId));
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
            <UserCard />
            <UploadCard />
            <YourUploadsCard />
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
