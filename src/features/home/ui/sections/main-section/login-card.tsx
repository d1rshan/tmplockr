"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { loginFormSchema } from "@/features/auth/schemas";

export function LoginCard() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      pin: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const { username, pin } = values;
      await axios.post("/api/sign-in", { username: username.toUpperCase(), pin });
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data || "Unknown error occured");
      console.log("[SIGN_IN]", error);
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
