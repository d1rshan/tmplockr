import z from "zod";

export const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const fileSchema = z.object({
  name: z.string().min(1),
  size: z.number(),
  type: z.string().min(1),
  imagekitId: z.string().min(1),
  imagekitUrl: z.string().min(1),
});
