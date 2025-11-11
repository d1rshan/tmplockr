import z from "zod";

export const signinBaseSchema = z.object({
  username: z
    .string()
    .min(1, { error: "USERNAME IS REQUIRED" })
    .min(4, { error: "USERNAME MUST BE ATLEAST 4 CHARACTERS" }),
  pin: z
    .string()
    .min(1, { error: "PIN IS REQUIRED" })
    .length(4, { error: "PIN MUST BE 4 DIGITS" }),
});

export const loginFormSchema = signinBaseSchema

export const signupBaseSchema = z.object({
  username: z
    .string()
    .min(4, "USERNAME MUST BE AT LEAST 4 CHARACTERS"),
  pin: z
    .string()
    .trim()
    .length(4, "PIN MUST BE 4 DIGITS"),
})

export const signupFormSchema = signupBaseSchema
  .extend({
    confirmPin: z
      .string()
      .trim()
      .length(4, "PIN MUST BE 4 DIGITS"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    path: ["confirmPin"],
    message: "PINS DO NOT MATCH",
  })
