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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, { error: "USERNAME IS REQUIRED" })
    .min(4, { error: "USERNAME MUST BE ATLEAST 4 CHARACTERS" }),
  pin: z
    .string()
    .min(1, { error: "PIN IS REQUIRED" })
    .length(4, { error: "PIN MUST BE 4 DIGITS" }),
});

export function LoginCard() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      pin: "",
    },
  });

  const {
    setError,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);

    const { username, pin } = values;

    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password: pin + process.env.NEXT_PUBLIC_PASSWORD_SALT,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const e = error as { errors: { message: string }[] };
      toast.error(e?.errors[0].message.toUpperCase());
      setError("root", { message: e?.errors[0].message.toUpperCase() });
      console.log("ERROR SIGNING IN", JSON.stringify(error, null, 2));
    }
  }

  useEffect(() => {
    if (errors.username) {
      toast.error(errors.username.message);
    }
    if (errors.pin) {
      toast.error(errors.pin.message, { cancel: true });
    }
  }, [errors]);

  return (
    <Card>
      <CardHeader separator>
        <CardTitle>LOG IN</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "ENTER DASHBOARD"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
