"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteNote } from "@/features/dashboard/actions/notes";
import { Note } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Copy, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NotesCard({ notes }: { notes: Note[] }) {
  const [deletingNoteId, setDeletingNoteId] = useState("");

  async function handleDelete(noteId: string) {
    setDeletingNoteId(noteId);
    const res = await deleteNote(noteId);
    if (res.success) {
      toast.success("NOTE DELETED");
    } else {
      toast.error("FAILED TO DELETE NOTE");
    }
    setDeletingNoteId("");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>NOTES</CardTitle>
      </CardHeader>
      <CardContent className="uppercase flex flex-col gap-1 h-30 overflow-y-scroll scrollbar-hide ">
        {notes.map((note) => (
          <div
            key={note.id}
            className={cn(
              "flex justify-between items-center",
              deletingNoteId === note.id && "opacity-40"
            )}
          >
            <span>{note.title}</span>
            <div className="flex gap-3 items-center justify-center">
              <Button size={"icon"} variant={"custom"}>
                <Copy className="size-3.5" />
              </Button>
              <Button
                size={"icon"}
                onClick={() => handleDelete(note.id)}
                variant={"custom"}
                disabled={deletingNoteId === note.id}
              >
                <Trash className="size-3.5 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
