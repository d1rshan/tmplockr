import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileTextIcon, Copy, Trash2 } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedNote: Note | null;
  formatDate: (dateString: string) => string;
  copyNoteContent: () => void;
  handleDeleteNote: (noteId: number) => void;
}

export const NoteDetailDialog: React.FC<NoteDetailDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedNote,
  formatDate,
  copyNoteContent,
  handleDeleteNote,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
);
