"use client";

import { useState } from "react";
import {
  Copy,
  Download,
  FileIcon,
  FileTextIcon,
  Forward,
  ForwardIcon,
  Link2,
  LucideShare,
  MessageSquareShare,
  Share,
  Share2,
  SquareArrowOutUpRight,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { saveAs } from "file-saver";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { useDeleteNote } from "@/features/notes/hooks/use-delete-note";
import { useNotes } from "@/features/notes/hooks/use-notes";
import { useFiles } from "@/features/files/hooks/use-files";
import { useDeleteFile } from "@/features/files/hooks/use-delete-file";

export const YourUploadsCard = () => {
  const { data: notes = [] } = useNotes();
  const { mutate: deleteNote, isPending: isDeletingNote } = useDeleteNote();

  const { data: files = [] } = useFiles();
  const { mutate: deleteFile, isPending: isDeletingFile } = useDeleteFile();

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const toggleSelection = (
    id: string,
    selected: boolean,
    type: "file" | "note"
  ) => {
    if (type === "file") {
      setSelectedFiles((prev) =>
        selected ? [...prev, id] : prev.filter((f) => f !== id)
      );
    } else {
      setSelectedNotes((prev) =>
        selected ? [...prev, id] : prev.filter((n) => n !== id)
      );
    }
  };

  const handleSubmit = () => {
    alert(
      `Selected Files: ${selectedFiles.join(
        ", "
      )}\nSelected Notes: ${selectedNotes.join(", ")}`
    );
  };

  const copyNote = async (title: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${title} copied!`);
    } catch (error) {
      toast.error("Failed to copy");
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Uploads</CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon" onClick={handleSubmit}>
            <Share className="h-4 w-4" />
          </Button>
        </CardAction>
        <CardDescription>
          All your files, images and notes in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        {files && files.length > 0 && (
          <div>
            <p className="font-semibold">Files</p>
            <div className="rounded-md border mb-6">
              <div className="divide-y">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          toggleSelection(file.id, !!checked, "file")
                        }
                      />
                      <div className="bg-slate-100 p-2 rounded">
                        <FileIcon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-slate-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-x-2 items-center">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={file.imagekitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Link2 />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          saveAs(file.imagekitUrl, file.name);
                        }}
                      >
                        <Download />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          deleteFile({
                            fileId: file.id!,
                            imagekitId: file.imagekitId,
                          })
                        }
                        disabled={isDeletingFile}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {notes && notes.length > 0 && (
          <div>
            <p className="font-semibold">Notes</p>
            <div className="rounded-md border">
              <div className="divide-y">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          toggleSelection(note.id, !!checked, "note")
                        }
                      />
                      <div className="bg-slate-100 p-2 rounded">
                        <FileTextIcon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">{note.title}</p>
                        <p className="text-sm text-slate-500 truncate max-w-md">
                          {note.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyNote(note.title, note.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNote({ noteId: note.id })}
                        disabled={isDeletingNote}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
