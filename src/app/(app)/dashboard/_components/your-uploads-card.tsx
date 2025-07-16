import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { Note } from "@/lib/db/schema";
import { FileIcon, FileTextIcon, X } from "lucide-react";

export const YourUploadsCard = ({ notes }: { notes: Note[] }) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Uploads</CardTitle>
        <CardDescription>
          All your files, images and notes in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="files">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

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
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded">
                        <FileTextIcon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">{note.title}</p>
                        <p className="text-sm text-slate-500 truncate max-w-md">
                          {note.content}
                        </p>
                        {/* <p className="text-xs text-slate-400 mt-1">
                          {note.date}
                        </p> */}
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
        </Tabs>
      </CardContent>
    </Card>
  );
};
