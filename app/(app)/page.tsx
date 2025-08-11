"use client";

import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import {
  AlertCircleIcon,
  FileText,
  ImageIcon,
  Loader2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function HomePage() {
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

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">TmpLockr</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Share files fast and easy
            </h2>
            <p className="text-xl text-slate-600">
              Set up a account in seconds, upload your files, and access them
              from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/sign-up">
                  <Upload size={18} />
                  Start uploading
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn more
              </Button>
            </div>
            <div className="pt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <Upload className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-medium">Upload Files</h3>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <FileText className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-medium">Save Notes</h3>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <ImageIcon className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="font-medium">Store Images</h3>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
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
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 text-center text-slate-500">
        <p>© 2025 TmpLockr. Simple, secure file sharing.</p>
      </footer>
    </div>
  );
}
