import { Button } from "@/components/ui/button";

import Link from "next/link";
import { FileText, ImageIcon, Upload } from "lucide-react";
import { LoginCard } from "@/components/login-card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">TmpLockr</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Share files fast and easy
            </h2>
            <p className="text-xl text-slate-600">
              Set up a account in seconds, upload your files, and access them
              from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/sign-up">
                  <Upload size={18} />
                  Start uploading
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn more
              </Button>
            </div>
            <div className="pt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <Upload className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-medium">Upload Files</h3>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <FileText className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-medium">Save Notes</h3>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <ImageIcon className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-medium">Store Images</h3>
              </div>
            </div>
          </div>

          <LoginCard />
        </div>
      </main>

      <footer className="container mx-auto py-6 text-center text-slate-500">
        <p>© 2025 TmpLockr. Simple, secure file sharing.</p>
      </footer>
    </div>
  );
}
