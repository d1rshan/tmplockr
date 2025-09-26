"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const signupFormSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "USERNAME IS REQUIRED" })
      .min(4, { message: "USERNAME MUST BE AT LEAST 4 CHARACTERS" }),
    pin: z
      .string()
      .trim()
      .nonempty({ message: "PIN IS REQUIRED" })
      .length(4, { message: "PIN MUST BE 4 DIGITS" }),
    confirmPin: z
      .string()
      .trim()
      .nonempty({ message: "CONFIRM PIN IS REQUIRED" })
      .length(4, { message: "PIN MUST BE 4 DIGITS" }),
  })
  .refine((data) => data.pin === data.confirmPin, {
    path: ["confirmPin"],
    error: "PINS DO NOT MATCH",
  });

export function SignupCard() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      pin: "",
      confirmPin: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    const { username, pin } = values;

    console.log(values);
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.create({
        username: username,
        password: pin + process.env.NEXT_PUBLIC_PASSWORD_SALT,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/dashboard");
      }
    } catch (error) {
      // const e = error as { errors: { message: string }[] };
      toast.error("FAILED TO SIGN UP!");
      console.log("Error signing up", JSON.stringify(error, null, 2));
    }
  }

  useEffect(() => {
    if (errors.root) {
      toast.error(errors.root.message);
    }
    if (errors.username) {
      toast.error(errors.username.message);
    }
    if (errors.pin) {
      toast.error(errors.pin.message);
    }
    if (errors.confirmPin) {
      toast.error(errors.confirmPin.message);
    }
  }, [errors]);

  return (
    <Card className="row-span-2">
      <CardHeader separator className="flex justify-between">
        <CardTitle>SIGN UP</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center  h-full gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>USERNAME</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN</FormLabel>
                  <FormControl>
                    <Input type="password" pin placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RE-ENTER PIN</FormLabel>
                  <FormControl>
                    <Input type="password" pin placeholder="" {...field} />
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
                "CREATE ACCOUNT"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
