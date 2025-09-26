import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotes, getUsageDetails } from "@/features/dashboard/data";
import { FilesCard } from "./files-card";
import { NotesCard } from "./notes-card";
import { SharesCard } from "./shares-card";
import { verifySessionRedirect } from "@/lib/auth-checks";

export async function FilesNotesSharesSection() {
  const userId = await verifySessionRedirect();

  const { notesUsed } = await getUsageDetails(userId);

  const notes = await getNotes(userId);

  return (
    <Card className="mb-4">
      <CardHeader separator>
        <CardTitle>YOUR FILES, NOTES & SHARES {notesUsed}</CardTitle>
      </CardHeader>
      {/* <CardContent>
        {notes.map((note: { title: string; content: string; id: string }) => (
          <div key={note.id}>{note.title}</div>
        ))}
      </CardContent> */}
      {/* <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DataTable data={data} title="FILES" rowsPerPage={5} />
        <DataTable data={data} title="NOTES" rowsPerPage={5} />
        <div className="sm:col-span-2">
          <DataTable data={data} title="SHARES" rowsPerPage={5} />
        </div>
      </CardContent> */}
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FilesCard />
        <NotesCard notes={notes} />
        <SharesCard />
      </CardContent>
    </Card>
  );
}
