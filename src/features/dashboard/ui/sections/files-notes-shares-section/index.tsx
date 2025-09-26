import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFiles, getNotes, getUsageDetails } from "@/features/dashboard/data";
import { FilesCard } from "./files-card";
import { NotesCard } from "./notes-card";
import { SharesCard } from "./shares-card";
import { verifySessionRedirect } from "@/lib/auth-checks";

export async function FilesNotesSharesSection() {
  const userId = await verifySessionRedirect();

  const notes = await getNotes(userId);
  const files = await getFiles(userId);

  return (
    <Card className="mb-4">
      <CardHeader separator>
        <CardTitle>YOUR FILES, NOTES & SHARES</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FilesCard files={files} />
        <NotesCard notes={notes} />
        <SharesCard />
      </CardContent>
    </Card>
  );
}
