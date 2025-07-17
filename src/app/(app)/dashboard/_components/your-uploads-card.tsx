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
import { useFilesStore } from "@/stores/filesStore";
import { useNotesStore } from "@/stores/notesStore";
import { FileIcon, FileTextIcon, Link2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export const YourUploadsCard = () => {
  const { files, fetchFiles } = useFilesStore();
  const { notes, isDeleting, deleteNote, fetchNotes } = useNotesStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchNotes();
      await fetchFiles();
    };
    fetchData();
  }, [fetchNotes, fetchFiles]);

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
                          href={file.publicId}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Link2 />
                        </Link>
                      </Button>

                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="rounded-md border">
              <div className="divide-y">
                {notes.map((note) => (
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNote(note.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
