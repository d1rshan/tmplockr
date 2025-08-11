"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
// import { useNotesStore } from "@/stores/notesStore";

const createNoteFormSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  content: z.string().min(1, { error: "Content is required" }),
});

export const CreateNoteTab = () => {
  const form = useForm<z.infer<typeof createNoteFormSchema>>({
    resolver: zodResolver(createNoteFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { reset } = form;

  const addNote = (values: any) => {};

  const isSaving = true;

  // const { addNote, isSaving } = useNotesStore();
  const onSubmit = async (values: z.infer<typeof createNoteFormSchema>) => {
    await addNote(values);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title for your note" {...field} />
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
        <Button type="submit" disabled={isSaving}>
          {isSaving ? <Loader2 className="animate-spin" /> : "Save Note"}
        </Button>
      </form>
    </Form>
  );
};
