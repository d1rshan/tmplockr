import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { UploadIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadCardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDragOver: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  handleFileUpload: () => void;
  uploadProgress: number;
  usageDetails: any;
  STORAGE_LIMIT_BYTES: number;
  formatFileSize: (bytes: number) => string;
  noteTitle: string;
  setNoteTitle: (title: string) => void;
  noteContent: string;
  setNoteContent: (content: string) => void;
  handleSaveNote: () => void;
  isSavingNote: boolean;
  notes: any[];
  usageData: any;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  activeTab,
  setActiveTab,
  isDragOver,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileSelect,
  isUploading,
  selectedFiles,
  setSelectedFiles,
  handleFileUpload,
  uploadProgress,
  usageDetails,
  STORAGE_LIMIT_BYTES,
  formatFileSize,
  noteTitle,
  setNoteTitle,
  noteContent,
  setNoteContent,
  handleSaveNote,
  isSavingNote,
  notes,
  usageData,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Upload</CardTitle>
      <CardDescription>
        Add new files, images or text to your vault
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="files" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>
        <TabsContent value="files" className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-slate-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="bg-slate-100 p-3 rounded-full">
                <UploadIcon className="h-6 w-6 text-slate-600" />
              </div>
              <h3 className="font-medium text-slate-900">
                {isDragOver
                  ? "Drop files here"
                  : "Drag files here or click to upload"}
              </h3>
              <p className="text-sm text-slate-500">
                Support for documents, PDFs, images, and more
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.mp4,.avi,.mov,.wmv,.flv,.webm,.mkv,.m4v,.3gp,.mp3,.wav,.ogg,.m4a"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    disabled={isUploading}
                    className="cursor-pointer"
                    asChild
                  >
                    <span>Select Files</span>
                  </Button>
                </label>
                {usageDetails && (
                  <p className="text-xs text-slate-400">
                    Available storage:{" "}
                    {formatFileSize(
                      STORAGE_LIMIT_BYTES - usageDetails.storageUsed
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          {selectedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-900">Selected Files:</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFiles([])}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Clear Selection
                </Button>
              </div>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded">
                        {/* You can add icons here based on file type if needed */}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-slate-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className="flex-1"
                >
                  {isUploading
                    ? "Uploading..."
                    : `Upload ${selectedFiles.length} File${
                        selectedFiles.length > 1 ? "s" : ""
                      }`}
                </Button>
              </div>
            </div>
          )}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uploading...</span>
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
                You've reached the maximum limit of {usageData.notes.limit}{" "}
                notes. Please delete some notes before creating new ones.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);
