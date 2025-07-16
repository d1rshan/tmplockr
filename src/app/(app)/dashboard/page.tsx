"use client";

import { UserButton } from "@clerk/nextjs";
import { UploadCard } from "./_components/upload-card";
import { YourUploadsCard } from "./_components/your-uploads-card";
import { useEffect, useState } from "react";
import { Note } from "@/lib/db/schema";
import axios from "axios";
import { toast } from "sonner";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get("/api/notes");

    if (res.status === 201) {
      setNotes(res.data);
      toast.success("Fetched all notes");
    } else {
      toast.error("Failed to fetch notes");
    }
  };
  const createNote = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    const res = await axios.post("/api/notes", { title, content });

    if (res.status === 201) {
      setNotes((prev) => [...prev, res.data]);
      toast.success("Note saved");
    } else {
      toast.error("Failed to save note");
    }
  };

  // const deleteNote = () => {};
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">TxtBin</h1>
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
          <UploadCard createNote={createNote} />
          <YourUploadsCard notes={notes} />
        </div>
      </main>
    </div>
  );
}
