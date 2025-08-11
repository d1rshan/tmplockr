"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { AlertCircleIcon, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const LoginCard = () => {
  const [username, setUsername] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (username.length === 0) {
      setError("Username is required");
      return;
    }
    if (pin.length !== 4) {
      setError("Pin must be 4 digits");
      return;
    }
    if (username.length < 4 || username.length > 64) {
      setError("Username must be between 4 and 64 characters");
      return;
    }

    try {
      setIsLoading(true);
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
      setError(e?.errors[0].message);
      console.log("Error signing in", JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Access your files</CardTitle>
        <CardDescription>
          Enter your 4-digit pin to view your uploads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="code">Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password </Label>
              <InputOTP
                maxLength={4}
                value={pin}
                onChange={(value: string) => setPin(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} mask />
                  <InputOTPSlot index={1} mask />
                  <InputOTPSlot index={2} mask />
                  <InputOTPSlot index={3} mask />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              className="w-full gap-2"
              type="submit"
              disabled={!isLoaded || isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Access Files"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};
