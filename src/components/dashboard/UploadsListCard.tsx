import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  ImageIcon,
  FileTextIcon,
  X,
  Trash2,
  Download,
} from "lucide-react";

interface FileItem {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  publicId: string;
  uploadedAt: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface UploadsListCardProps {
  files: FileItem[];
  notes: Note[];
  isLoadingFiles: boolean;
  isLoadingNotes: boolean;
  formatFileSize: (bytes: number) => string;
  formatDate: (dateString: string) => string;
  downloadFile: (file: FileItem) => void;
  openNoteModal: (note: Note) => void;
  handleDeleteNote: (noteId: number) => void;
}

export const UploadsListCard: React.FC<UploadsListCardProps> = ({
  files,
  notes,
  isLoadingFiles,
  isLoadingNotes,
  formatFileSize,
  formatDate,
  downloadFile,
  openNoteModal,
  handleDeleteNote,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Your Uploads</CardTitle>
      <CardDescription>
        All your files, images and notes in one place
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4 bg-slate-50 border-b">
              <h3 className="font-medium">Files </h3>
            </div>
            <div className="divide-y">
              {isLoadingFiles ? (
                <div className="p-4 text-center text-slate-500">
                  Loading files...
                </div>
              ) : files.length === 0 ? (
                <div className="p-4 text-center text-slate-500">
                  No files uploaded yet. Upload your first file!
                </div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded">
                        {file.fileType.startsWith("image/") ? (
                          <ImageIcon className="h-5 w-5 text-slate-600" />
                        ) : (
                          <FileIcon className="h-5 w-5 text-slate-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{file.fileName}</p>
                        <p className="text-sm text-slate-500">
                          {formatFileSize(file.fileSize)} •{" "}
                          {formatDate(file.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadFile(file)}
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        title="Download file"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-md border">
            <div className="p-4 bg-slate-50 border-b">
              <h3 className="font-medium">Notes</h3>
            </div>
            <div className="divide-y">
              {isLoadingNotes ? (
                <div className="p-4 text-center text-slate-500">
                  Loading notes...
                </div>
              ) : notes.length === 0 ? (
                <div className="p-4 text-center text-slate-500">
                  No notes yet. Create your first note!
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                      onClick={() => openNoteModal(note)}
                    >
                      <div className="bg-slate-100 p-2 rounded">
                        <FileTextIcon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{note.title}</p>
                        <p className="text-sm text-slate-500 truncate max-w-md">
                          {note.content}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDate(note.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openNoteModal(note)}
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <FileTextIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="files">
          <div className="rounded-md border">
            <div className="divide-y">
              {isLoadingFiles ? (
                <div className="p-4 text-center text-slate-500">
                  Loading files...
                </div>
              ) : files.length === 0 ? (
                <div className="p-4 text-center text-slate-500">
                  No files uploaded yet. Upload your first file!
                </div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded">
                        {file.fileType.startsWith("image/") ? (
                          <ImageIcon className="h-5 w-5 text-slate-600" />
                        ) : (
                          <FileIcon className="h-5 w-5 text-slate-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{file.fileName}</p>
                        <p className="text-sm text-slate-500">
                          {formatFileSize(file.fileSize)} •{" "}
                          {formatDate(file.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadFile(file)}
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        title="Download file"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="notes">
          <div className="rounded-md border">
            <div className="divide-y">
              {isLoadingNotes ? (
                <div className="p-4 text-center text-slate-500">
                  Loading notes...
                </div>
              ) : notes.length === 0 ? (
                <div className="p-4 text-center text-slate-500">
                  No notes yet. Create your first note!
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                      onClick={() => openNoteModal(note)}
                    >
                      <div className="bg-slate-100 p-2 rounded">
                        <FileTextIcon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{note.title}</p>
                        <p className="text-sm text-slate-500 truncate max-w-md">
                          {note.content}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDate(note.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openNoteModal(note)}
                        className="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <FileTextIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);
