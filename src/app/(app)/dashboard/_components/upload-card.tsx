"use client";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const createNoteFormSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  content: z.string().min(1, { error: "Content is required" }),
});

export const UploadCard = ({
  createNote,
}: {
  createNote: ({ title, content }: { title: string; content: string }) => void;
}) => {
  const form = useForm<z.infer<typeof createNoteFormSchema>>({
    resolver: zodResolver(createNoteFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createNoteFormSchema>) {
    setIsSavingNote(true);
    await createNote(values);
    setIsSavingNote(false);
  }
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
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
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-slate-100 p-3 rounded-full">
                  <UploadIcon className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-medium text-slate-900">
                  Drag files here or click to upload
                </h3>
                <p className="text-sm text-slate-500">
                  Support for documents, PDFs, and more
                </p>
                <Button
                  onClick={simulateUpload}
                  disabled={isUploading}
                  className="mt-2"
                >
                  Select Files
                </Button>
              </div>
            </div>

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a title for your note"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          id="note-content"
                          placeholder="Type your note here..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSavingNote}>
                  {isSavingNote ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save Note"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
