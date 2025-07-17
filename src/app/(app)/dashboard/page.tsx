import { UserButton } from "@clerk/nextjs";
import { UploadCard } from "./_components/upload-card";
import { YourUploadsCard } from "./_components/your-uploads-card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">Tmplockr</h1>
            </div>
            {/* TODO: Sign out button */}
            {/* <Button variant="outline" size="sm">
              Sign Out
            </Button> */}
            <UserButton />
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
