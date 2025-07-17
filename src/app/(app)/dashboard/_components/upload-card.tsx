"use client";
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
import { upload } from "@imagekit/next";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const createNoteFormSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  content: z.string().min(1, { error: "Content is required" }),
});

export const UploadCard = ({
  createNote,
  isSavingNote,
}: {
  createNote: ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => Promise<void>;
  isSavingNote: boolean;
}) => {
  const form = useForm<z.infer<typeof createNoteFormSchema>>({
    resolver: zodResolver(createNoteFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof createNoteFormSchema>) => {
    await createNote(values);
    reset();
  };

  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState<File[] | null>(null);

  const onDrop = useCallback((files: File[]) => {
    // Do something with the files
    setAcceptedFiles(files);
  }, []);
  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
  });
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = inputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }
    setIsUploading(true);
    for (const file of fileInput.files) {
      let authParams;
      try {
        authParams = await authenticator();
      } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return;
      }
      const { signature, expire, token, publicKey } = authParams;

      try {
        const uploadResponse = await upload({
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name,
          onProgress: (event) => {
            setProgress((event.loaded / event.total) * 100);
          },
        });
        console.log("Upload response:", uploadResponse);
        toast.success(`${file.name} uploaded`);
        setProgress(0);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.log(`Failed to upload ${file.name}`, error);
      }
    }
    setIsUploading(false);
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
            <div
              className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center"
              {...getRootProps()}
            >
              <Input {...getInputProps()} />

              <div className="flex flex-col items-center gap-2">
                <div className="bg-slate-100 p-3 rounded-full">
                  <UploadIcon className="h-6 w-6 text-slate-600" />
                </div>

                <h3 className="font-medium text-slate-900">
                  {isDragActive
                    ? " Drop the files here ..."
                    : "Drag drop some files here, or click to select files"}
                </h3>

                <p className="text-sm text-slate-500">
                  Support for documents, PDFs, and more
                </p>
              </div>
            </div>
            <Button className="mt-2" onClick={handleUpload}>
              Upload
            </Button>
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-slate-500">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <Progress value={progress} max={100} />
              </div>
            )}
            {acceptedFiles && (
              <div className="space-y-2">
                {acceptedFiles.map((acceptedFile) => (
                  <div key={acceptedFile.name}>{acceptedFile.name}</div>
                ))}
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
