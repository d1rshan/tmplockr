"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { UsageDetailsCard } from "@/components/dashboard/UsageDetailsCard";
import { UploadCard } from "@/components/dashboard/UploadCard";
import { UploadsListCard } from "@/components/dashboard/UploadsListCard";
import { NoteDetailDialog } from "@/components/dashboard/NoteDetailDialog";
import { formatDate } from "@/lib/utils";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface FileItem {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  publicId: string;
  uploadedAt: string;
}

interface UsageDetails {
  id: string;
  clerkUserId: string;
  storageUsed: number;
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

  // Files state
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Usage details state
  const [usageDetails, setUsageDetails] = useState<UsageDetails | null>(null);
  const [isLoadingUsage, setIsLoadingUsage] = useState(true);

  // Note detail modal state
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // Storage limits (100MB = 100 * 1024 * 1024 bytes)
  const STORAGE_LIMIT_BYTES = 100 * 1024 * 1024;
  const NOTE_LIMIT = 10;

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

  // Fetch files from API
  const fetchFiles = async () => {
    try {
      setIsLoadingFiles(true);
      const response = await fetch("/api/files");
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        console.error("Failed to fetch files");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Fetch usage details from API
  const fetchUsageDetails = async () => {
    try {
      setIsLoadingUsage(true);
      const response = await fetch("/api/usage-details");
      if (response.ok) {
        const data = await response.json();
        if (data.data !== "NO FILES") {
          setUsageDetails(data);
        } else {
          setUsageDetails({ id: "", clerkUserId: "", storageUsed: 0 });
        }
      } else {
        console.error("Failed to fetch usage details");
      }
    } catch (error) {
      console.error("Error fetching usage details:", error);
    } finally {
      setIsLoadingUsage(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFilesValidation(files);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFilesValidation(files);
  };

  // Validate files before upload
  const handleFilesValidation = (files: File[]) => {
    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    // Define allowed file types
    const allowedTypes = [
      // Images
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/svg+xml",
      // Videos
      "video/mp4",
      "video/avi",
      "video/mov",
      "video/wmv",
      "video/flv",
      "video/webm",
      "video/x-matroska",
      "video/3gpp",
      // Audio
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/mp4",
      "audio/aac",
      // Documents
      "application/pdf",
    ];

    // Check for unsupported file types
    const unsupportedFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (unsupportedFiles.length > 0) {
      const unsupportedNames = unsupportedFiles
        .map((file) => file.name)
        .join(", ");
      toast.error(
        `Unsupported file type(s): ${unsupportedNames}. Only PDFs, images, videos, and audio files are allowed.`
      );
      return;
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const currentStorageUsed = usageDetails?.storageUsed || 0;
    const availableStorage = STORAGE_LIMIT_BYTES - currentStorageUsed;

    if (totalSize > availableStorage) {
      toast.error(
        `Total file size (${formatFileSize(
          totalSize
        )}) exceeds available storage (${formatFileSize(availableStorage)})`
      );
      return;
    }

    setSelectedFiles(files);
  };

  // Upload files
  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90; // Keep at 90% until actual upload completes
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        toast.success(`${selectedFiles.length} file(s) uploaded successfully!`);
        setSelectedFiles([]);
        // Refresh files and usage details
        await Promise.all([fetchFiles(), fetchUsageDetails()]);
      } else {
        const error = await response.json();
        toast.error(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Create new note
  const handleSaveNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error("Please enter both title and content");
      return;
    }

    // Check note limit
    if (notes.length >= NOTE_LIMIT) {
      toast.error(
        `You've reached the maximum limit of ${NOTE_LIMIT} notes. Please delete some notes before creating new ones.`
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

  // Download file from Cloudinary
  const downloadFile = (file: FileItem) => {
    try {
      // Extract file extension from filename
      const fileExtension = file.fileName.split(".").pop() || "";

      // Construct Cloudinary download URL with fl_attachment flag to force download
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const downloadUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${file.publicId}.${fileExtension}`;

      // Create a temporary link element to trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.fileName; // Set the filename for download
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // toast.success(`Downloading ${file.fileName}...`);
    } catch (error) {
      console.error("Failed to download file:", error);
      toast.error("Failed to download file");
    }
  };

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Load all data on component mount
  useEffect(() => {
    Promise.all([fetchNotes(), fetchFiles(), fetchUsageDetails()]);
  }, []);

  // Calculate usage data from real data
  const usageData = {
    files: {
      used: usageDetails ? usageDetails.storageUsed / (1024 * 1024) : 0, // Convert to MB
      limit: STORAGE_LIMIT_BYTES / (1024 * 1024), // Convert to MB
      unit: "MB",
    },
    notes: {
      used: notes.length,
      limit: NOTE_LIMIT,
      unit: "notes",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#000000",
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
            <UserButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6">
          <UsageDetailsCard usageData={usageData} />
          <UploadCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isDragOver={isDragOver}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileSelect={handleFileSelect}
            isUploading={isUploading}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            handleFileUpload={handleFileUpload}
            uploadProgress={uploadProgress}
            usageDetails={usageDetails}
            STORAGE_LIMIT_BYTES={STORAGE_LIMIT_BYTES}
            formatFileSize={formatFileSize}
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
            noteContent={noteContent}
            setNoteContent={setNoteContent}
            handleSaveNote={handleSaveNote}
            isSavingNote={isSavingNote}
            notes={notes}
            usageData={usageData}
          />
          <UploadsListCard
            files={files}
            notes={notes}
            isLoadingFiles={isLoadingFiles}
            isLoadingNotes={isLoadingNotes}
            formatFileSize={formatFileSize}
            formatDate={formatDate}
            downloadFile={downloadFile}
            openNoteModal={openNoteModal}
            handleDeleteNote={handleDeleteNote}
          />
        </div>
      </main>
      <NoteDetailDialog
        isOpen={isNoteModalOpen}
        onOpenChange={setIsNoteModalOpen}
        selectedNote={selectedNote}
        formatDate={formatDate}
        copyNoteContent={copyNoteContent}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
}
