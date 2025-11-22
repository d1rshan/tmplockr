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
      <CardContent className="uppercase flex flex-col gap-3 h-80 overflow-y-scroll scrollbar-hide">
        {notes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            NO NOTES YET
          </div>
        ) : (
          notes.map((note, index) => (
            <NoteItem key={note.id} note={note} index={index + 1} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function NoteItem({ note, index }: { note: Note; index: number }) {
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

  const handleCopy = () => {
    navigator.clipboard.writeText(note.content);
    toast.success("NOTE COPIED TO CLIPBOARD");
  };

  return (
    <div
      className={`group relative border border-border rounded-lg p-3 hover:bg-accent/50 transition-all duration-200 ${isPending ? "opacity-40" : ""
        }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground">
          {index.toString().padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" title={note.title}>
            {note.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {note.content.slice(0, 50)}{note.content.length > 50 ? '...' : ''}
          </p>

          {/*   Note • {new Date(note.createdAt).toLocaleDateString()} */}
          {/* </p> */}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={handleCopy}
          >
            <Copy className="size-3" />
          </Button>
          <Button
            size="icon"
            className="h-7 w-7 hover:bg-destructive/10"
            onClick={handleDelete}
            variant="ghost"
            disabled={isPending}
          >
            <Trash className="size-3 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}
