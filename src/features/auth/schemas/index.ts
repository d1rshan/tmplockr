import z from "zod";

export const signInSchema = z.object({
  username: z.string().min(4).nonempty(),
  password: z.string().min(6).nonempty(),
});

export const signUpSchema = z
  .object({
    username: z.string().min(4).nonempty(),
    password: z.string().min(6).nonempty(),
    confirmPassword: z.string().min(6).nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
  });