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
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState<string | null>(null);
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      const signUpAttempt = await signUp.create({
        username: username,
        password: pin + process.env.NEXT_PUBLIC_PASSWORD_SALT,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/dashboard");
      }
    } catch (error) {
      const e = error as { errors: { message: string }[] };
      console.log("Error signing up", JSON.stringify(error, null, 2));
      setError(e.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">TmpLockr</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft size={16} /> Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Sign Up </CardTitle>
                <CardDescription>
                  Create an account to get started
                </CardDescription>
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
                    <div className="grid gap-2">
                      <Label htmlFor="password">Re-enter Pin </Label>
                      <InputOTP
                        maxLength={4}
                        value={confirmPin}
                        onChange={(value: string) => setConfirmPin(value)}
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
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={!isLoaded || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Sign Up"
                      )}
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
        </div>
      </main>
    </div>
  );
}
