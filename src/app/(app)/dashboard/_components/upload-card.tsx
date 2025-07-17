"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CreateNoteTab } from "./create-note-tab";
import FileUploadTab from "./file-upload-tab";

export const UploadCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload</CardTitle>
        <CardDescription>
          Add new files, images or text to your vault
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="files">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-4">
            <FileUploadTab />
          </TabsContent>
          <TabsContent value="text" className="space-y-4">
            <CreateNoteTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
