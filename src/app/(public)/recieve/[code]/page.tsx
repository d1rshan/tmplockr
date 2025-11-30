import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recieve } from "@/features/dashboard/data";
import { FilesCard } from "@/features/dashboard/ui/sections/files-notes-shares-section/files-card";
import { NotesCard } from "@/features/dashboard/ui/sections/files-notes-shares-section/notes-card";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { code: string };
}) {
  const code = Number(params.code);

  if (!Number.isInteger(code)) {
    notFound();
  }

  const data = await recieve(code)

  if (!data) return <div className="min-h-screen flex items-center justify-center text-5xl">INVALID CODE</div>

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="mb-4">
        <CardHeader separator>
          <CardTitle>RECEIVED FILES & NOTES</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FilesCard files={data.files} />
          <NotesCard notes={data.notes} />
        </CardContent>
      </Card>
    </div>
  );
}
