import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateNoteCard } from "./create-note-card";
import { UploadFilesCard } from "./upload-files-card";
import { ShareFilesNotesCard } from "./share-files-notes-card";
import { verifySession } from "@/lib/verify-session";
import { getUsageDetails, getFiles, getNotes } from "@/features/dashboard/data";
import { RecieveCard } from "./recieve-card";

export async function QuickActionsSection() {
  const userId = await verifySession();
  const { notesUsed } = await getUsageDetails(userId);
  const files = await getFiles(userId);
  const notes = await getNotes(userId);

  return (
    <Card>
      <CardHeader separator>
        <CardTitle>QUICK ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-7 gap-4">
        <UploadFilesCard />
        <CreateNoteCard notesUsed={notesUsed} />
        <ShareFilesNotesCard files={files} notes={notes} />
        <RecieveCard />
      </CardContent>
    </Card>
  );
}
