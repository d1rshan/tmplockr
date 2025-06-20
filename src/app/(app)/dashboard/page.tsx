"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, FileTextIcon, ImageIcon, UploadIcon, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("files");

  // Mock data for demonstration
  const files = [
    {
      id: 1,
      name: "presentation.pdf",
      type: "file",
      size: "2.4 MB",
      date: "Today",
    },
    {
      id: 2,
      name: "document.docx",
      type: "file",
      size: "1.2 MB",
      date: "Yesterday",
    },
    {
      id: 3,
      name: "screenshot.png",
      type: "image",
      size: "0.8 MB",
      date: "Jun 10",
    },
  ];

  const notes = [
    {
      id: 1,
      title: "Meeting notes",
      content: "Discuss project timeline and deliverables",
      date: "Today",
    },
    {
      id: 2,
      title: "Shopping list",
      content: "Milk, eggs, bread, coffee",
      date: "Yesterday",
    },
  ];

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

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
          <Card>
            <CardHeader>
              <CardTitle>Upload</CardTitle>
              <CardDescription>
                Add new files, images or text to your vault
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="files"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>

                <TabsContent value="files" className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-slate-100 p-3 rounded-full">
                        <UploadIcon className="h-6 w-6 text-slate-600" />
                      </div>
                      <h3 className="font-medium text-slate-900">
                        Drag files here or click to upload
                      </h3>
                      <p className="text-sm text-slate-500">
                        Support for documents, PDFs, and more
                      </p>
                      <Button
                        onClick={simulateUpload}
                        disabled={isUploading}
                        className="mt-2"
                      >
                        Select Files
                      </Button>
                    </div>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Uploading...
                        </span>
                        <span className="text-sm text-slate-500">
                          {uploadProgress}%
                        </span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="note-title">Title</Label>
                      <Input
                        id="note-title"
                        placeholder="Enter a title for your note"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="note-content">Content</Label>
                      <Textarea
                        id="note-content"
                        placeholder="Type your note here..."
                        className="min-h-[200px]"
                      />
                    </div>
                    <Button>Save Note</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

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
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded">
                              {file.type === "image" ? (
                                <ImageIcon className="h-5 w-5 text-slate-600" />
                              ) : (
                                <FileIcon className="h-5 w-5 text-slate-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-slate-500">
                                {file.size} • {file.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4 bg-slate-50 border-b">
                      <h3 className="font-medium">Notes</h3>
                    </div>
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
                              <p className="text-xs text-slate-400 mt-1">
                                {note.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

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
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-slate-500">
                                {file.size} • {file.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
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
                              <p className="text-xs text-slate-400 mt-1">
                                {note.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
