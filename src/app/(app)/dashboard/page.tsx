"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  UploadIcon,
  X,
  HardDrive,
  FileText,
  Trash2,
  Copy,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("files");

  // Notes state
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  // Note detail modal state
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // Mock usage data
  const usageData = {
    files: {
      used: 80, // MB
      limit: 100, // MB
      unit: "MB",
    },
    notes: {
      used: 3,
      limit: 10,
      unit: "notes",
    },
  };

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

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      setIsLoadingNotes(true);
      const response = await fetch("/api/notes");
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  // Create new note
  const handleSaveNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error("Please enter both title and content");
      return;
    }

    // Check note limit
    if (notes.length >= usageData.notes.limit) {
      toast.error(
        `You've reached the maximum limit of ${usageData.notes.limit} notes. Please delete some notes before creating new ones.`
      );
      return;
    }

    try {
      setIsSavingNote(true);
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteTitle.trim(),
          content: noteContent.trim(),
        }),
      });

      if (response.ok) {
        const newNote = await response.json();
        setNotes((prev) => [newNote, ...prev]);
        setNoteTitle("");
        setNoteContent("");
        toast.success("Note saved successfully!");
      } else {
        const error = await response.json();
        toast.error(`Failed to save note: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    } finally {
      setIsSavingNote(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Custom confirmation using toast
  const confirmAction = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex items-center gap-3">
            <span>{message}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          duration: 10000, // 10 seconds to give user time to decide
          style: {
            background: "#363636",
            color: "#fff",
            minWidth: "300px",
          },
        }
      );
    });
  };

  // Delete note
  const handleDeleteNote = async (noteId: number) => {
    const confirmed = await confirmAction(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: noteId }),
      });

      if (response.ok) {
        setNotes((prev) => prev.filter((note) => note.id !== noteId));
        toast.success("Note deleted successfully!");
        // Close modal if it's open
        if (selectedNote?.id === noteId) {
          setIsNoteModalOpen(false);
          setSelectedNote(null);
        }
      } else {
        const error = await response.json();
        toast.error(`Failed to delete note: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  // Open note detail modal
  const openNoteModal = (note: Note) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  // Copy note content to clipboard
  const copyNoteContent = async () => {
    if (!selectedNote) return;

    try {
      await navigator.clipboard.writeText(selectedNote.content);
      toast.success("Note content copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy content:", error);
      toast.error("Failed to copy content");
    }
  };

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
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
          {/* Usage Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Details</CardTitle>
              <CardDescription>
                Your current storage and note usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* File Storage Usage */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <HardDrive className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">
                        File Storage
                      </h3>
                      <p className="text-sm text-slate-500">
                        {usageData.files.used}/{usageData.files.limit}{" "}
                        {usageData.files.unit} used
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Storage Usage</span>
                      <span className="text-sm text-slate-500">
                        {Math.round(
                          (usageData.files.used / usageData.files.limit) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (usageData.files.used / usageData.files.limit) * 100
                      }
                      className="h-2"
                    />
                    <p className="text-xs text-slate-400">
                      {usageData.files.limit - usageData.files.used}{" "}
                      {usageData.files.unit} remaining
                    </p>
                  </div>
                </div>

                {/* Notes Usage */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Notes</h3>
                      <p className="text-sm text-slate-500">
                        {notes.length}/{usageData.notes.limit}{" "}
                        {usageData.notes.unit}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Note Usage</span>
                      <span className="text-sm text-slate-500">
                        {Math.round(
                          (notes.length / usageData.notes.limit) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(notes.length / usageData.notes.limit) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-slate-400">
                      {usageData.notes.limit - notes.length}{" "}
                      {usageData.notes.unit} remaining
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="note-content">Content</Label>
                      <Textarea
                        id="note-content"
                        placeholder="Type your note here..."
                        className="min-h-[200px]"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleSaveNote}
                      disabled={
                        isSavingNote ||
                        !noteTitle.trim() ||
                        !noteContent.trim() ||
                        notes.length >= usageData.notes.limit
                      }
                    >
                      {isSavingNote ? "Saving..." : "Save Note"}
                    </Button>
                    {notes.length >= usageData.notes.limit && (
                      <p className="text-sm text-red-500 text-center">
                        You've reached the maximum limit of{" "}
                        {usageData.notes.limit} notes. Please delete some notes
                        before creating new ones.
                      </p>
                    )}
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
        </div>
      </main>

      {/* Note Detail Modal */}
      <Dialog open={isNoteModalOpen} onOpenChange={setIsNoteModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5 text-slate-600" />
              {selectedNote?.title}
            </DialogTitle>
            <p className="text-sm text-slate-500">
              Created {selectedNote && formatDate(selectedNote.createdAt)}
            </p>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-slate-700 whitespace-pre-wrap">
                {selectedNote?.content}
              </p>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={copyNoteContent}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Content
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedNote && handleDeleteNote(selectedNote.id)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
