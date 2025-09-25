"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader2 } from "lucide-react";
import { createNoteSchema } from "@/features/dashboard/schemas";

export function CreateNoteCard() {
  const form = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof createNoteSchema>) {
    console.log(values);
  }

  return (
    <Card className="sm:row-span-3 sm:col-span-3">
      <CardHeader>
        <CardTitle>CREATE NOTE</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TITLE</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CONTENT</FormLabel>
                  <FormControl>
                    <Textarea className=" resize-none h-50" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "CREATE"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
