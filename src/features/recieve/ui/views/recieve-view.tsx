"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceivedFilesCard } from "../sections/received-files-card";
import { ReceivedNotesCard } from "../sections/received-notes-card";
import { File, Note } from "@/lib/db/schema";

interface RecieveViewProps {
  files: File[];
  notes: Note[];
}

export function RecieveView({ files, notes }: RecieveViewProps) {
  return (
    <div className="flex min-h-screen justify-center items-center p-4">
      <Card className="mb-4 max-w-6xl w-full">
        <CardHeader separator>
          <CardTitle>RECEIVED FILES & NOTES</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReceivedFilesCard files={files} />
          <ReceivedNotesCard notes={notes} />
        </CardContent>
      </Card>
    </div>
  );
}
