"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { useDeleteNote } from "@/features/notes/hooks/useDeleteNote";
import { useNotes } from "@/features/notes/hooks/useNotes";
import {
  Copy,
  Download,
  FileIcon,
  FileTextIcon,
  Link2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
// import { saveAs } from "file-saver";
import { toast } from "sonner";
import { Note } from "@/types";

export const YourUploadsCard = () => {
  const { data: notes, isLoading } = useNotes();
  const { mutate: deleteNote, isPending: isDeletingNote } = useDeleteNote();
  // const { files, fetchFiles, isDeletingFile, deleteFile } = useFilesStore();
  // const { notes, isDeletingNote, deleteNote, fetchNotes } = useNotesStore();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchNotes();
  //     await fetchFiles();
  //   };
  //   fetchData();
  // }, [fetchNotes, fetchFiles]);

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
        <CardDescription>
          All your files, images and notes in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="files">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          {/* {files.length > 0 && (
            <TabsContent value="files">
              <div className="rounded-md border">
                <div className="divide-y">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded">
                          <FileIcon className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium">{file.fileName}</p>
                          <p className="text-sm text-slate-500">
                            {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
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
                            saveAs(file.imagekitUrl, file.fileName);
                          }}
                        >
                          <Download />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteFile(file.id, file.imagekitId)}
                          disabled={isDeletingFile === file.id}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          )} */}
          {notes && notes.length > 0 && (
            <TabsContent value="notes">
              <div className="rounded-md border">
                <div className="divide-y">
                  {notes.map((note: Note) => (
                    <div
                      key={note.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-3">
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
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};
