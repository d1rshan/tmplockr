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
import { ArrowRight, FileText, ImageIcon, Upload } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">TxtBin</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/about">How it works</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Share files without accounts
            </h2>
            <p className="text-xl text-slate-600">
              Upload your files, get a 4-digit code, and access them from
              anywhere. No sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/upload">
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
                <h3 className="font-medium">Share Text</h3>
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
                  Enter your 4-digit code to view your uploads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action="/dashboard/1234">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="code">Username</Label>
                      <Input type="text" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password </Label>
                      <InputOTP maxLength={4}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} mask />
                          <InputOTPSlot index={1} mask />
                          <InputOTPSlot index={2} mask />
                          <InputOTPSlot index={3} mask />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" asChild>
                  <Link href="/dashboard/1234">
                    Access Files
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 text-center text-slate-500">
        <p>© 2025 FileVault. Simple, secure file sharing.</p>
      </footer>
    </div>
  );
}
