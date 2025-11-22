"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { File, Note } from "@/lib/db/schema";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareFilesNotesCardProps {
  files: File[];
  notes: Note[];
}

export function ShareFilesNotesCard({ files, notes }: ShareFilesNotesCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const handleFileToggle = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleNoteToggle = (noteId: string) => {
    setSelectedNotes(prev =>
      prev.includes(noteId)
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  const handleShare = () => {
    console.log("Selected Files:", selectedFiles);
    console.log("Selected Notes:", selectedNotes);
    setIsDialogOpen(false);
  };

  const totalSelected = selectedFiles.length + selectedNotes.length;
  const hasSelections = totalSelected > 0;

  return (
    <Card className="sm:col-span-4">
      <CardHeader>
        <CardTitle>SHARE FILES & NOTES</CardTitle>
        <CardDescription className="text-muted-foreground">
          {selectedFiles.length} FILES, {selectedNotes.length} NOTES SELECTED.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                SELECT
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>SELECT FILES & NOTES TO SHARE</DialogTitle>
                <DialogDescription>
                  CHOOSE THE FILES AND NOTES YOU WANT TO INCLUDE IN YOUR SHARE.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Files Section */}
                <div>
                  <h3 className="text-sm font-medium mb-3">FILES ({files.length})</h3>
                  {files.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No files available</p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className={cn(
                            "flex items-center space-x-3 p-2 rounded-lg border hover:bg-accent/50 transition-colors",
                            selectedFiles.includes(file.id!) && "bg-accent"
                          )}
                        >
                          <Checkbox
                            id={`file-${file.id}`}
                            checked={selectedFiles.includes(file.id!)}
                            onCheckedChange={() => handleFileToggle(file.id!)}
                          />
                          <div className="flex-1 min-w-0">
                            <label
                              htmlFor={`file-${file.id}`}
                              className="text-sm truncate block"
                            >
                              {file.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div>
                  <h3 className="text-sm font-medium mb-3">NOTES ({notes.length})</h3>
                  {notes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No notes available</p>
                  ) : (
                    <div className="space-y-2 max-h-50 overflow-y-auto">
                      {notes.map((note) => (
                        <div
                          key={note.id}
                          className={cn(
                            "flex items-center space-x-3 p-2 rounded-lg border hover:bg-accent/50 transition-colors",
                            selectedNotes.includes(note.id!) && "bg-accent"
                          )}
                        >
                          <Checkbox
                            id={`note-${note.id}`}
                            checked={selectedNotes.includes(note.id!)}
                            onCheckedChange={() => handleNoteToggle(note.id!)}
                          />
                          <div className="flex-1 min-w-0">
                            <label
                              htmlFor={`note-${note.id}`}
                              className="text-sm truncate block"
                            >
                              {note.title}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                  >
                    CANCEL
                  </Button>
                  <Button onClick={handleShare} disabled={!hasSelections}>
                    DONE ({totalSelected} SELECTED)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            className="w-full"
            disabled={!hasSelections}
            onClick={handleShare}
          >
            SHARE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
