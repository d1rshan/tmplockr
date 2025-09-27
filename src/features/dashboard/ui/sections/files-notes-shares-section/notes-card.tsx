"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteNote } from "@/features/dashboard/actions/notes";
import { Note } from "@/lib/db/schema";
import { Copy, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function NotesCard({ notes }: { notes: Note[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NOTES</CardTitle>
      </CardHeader>
      <CardContent className="uppercase flex flex-col gap-1 h-40 overflow-y-scroll scrollbar-hide ">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </CardContent>
    </Card>
  );
}

function NoteItem({ note }: { note: Note }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteNote(note.id);
        if (res.success) toast.success("NOTE DELETED");
        else toast.error("FAILED TO DELETE NOTE");
      } catch {
        toast.error("FAILED TO DELETE NOTE");
      }
    });
  };

  return (
    <div
      className={`flex justify-between items-center ${
        isPending ? "opacity-40" : ""
      }`}
    >
      <span>{note.title}</span>
      <div className="flex gap-3 items-center justify-center">
        <Button size={"icon"} variant={"custom"}>
          <Copy className="size-3.5" />
        </Button>
        <Button
          size={"icon"}
          onClick={handleDelete}
          variant={"custom"}
          disabled={isPending}
        >
          <Trash className="size-3.5 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
