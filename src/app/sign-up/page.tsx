"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const router = useRouter();

  if (!isLoaded) {
    return null; // TODO:put a loading spinner here
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (pin !== confirmPin) {
      setError("Passwords do not match");
      return;
    }
    if (pin.length !== 4) {
      setError("Pin must be 4 digits");
      return;
    }
    if (username.length === 0) {
      setError("Username is required");
      return;
    }
    if (username.length < 4 || username.length > 64) {
      setError("Username must be between 4 and 6 characters");
      return;
    }

    try {
      const signUpAttempt = await signUp.create({
        username: username,
        password: pin + process.env.NEXT_PUBLIC_PASSWORD_SALT,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error signing up", JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up </CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
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
                <Label htmlFor="password">Pin</Label>
                <InputOTP
                  maxLength={4}
                  value={pin}
                  onChange={(value) => setPin(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} mask />
                    <InputOTPSlot index={1} mask />
                    <InputOTPSlot index={2} mask />
                    <InputOTPSlot index={3} mask />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Re-enter Pin </Label>
                <InputOTP
                  maxLength={4}
                  value={confirmPin}
                  onChange={(value) => setConfirmPin(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} mask />
                    <InputOTPSlot index={1} mask />
                    <InputOTPSlot index={2} mask />
                    <InputOTPSlot index={3} mask />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {/* CAPTCHA Widget */}
              <div id="clerk-captcha"></div>
              <Button className="w-full" type="submit" disabled={!isLoaded}>
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
