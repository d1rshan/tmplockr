"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef, useState } from "react";

export const QuickActionsSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const handleFiles = (files: File[]) => {
    setFiles((prev) => [...prev, ...Array.from(files)]);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files) handleFiles(e.target.files);
  };
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>QUICK ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-7 gap-4">
        <Card className="sm:col-span-4">
          <CardHeader>
            <CardTitle>UPLOAD FILES</CardTitle>
            <CardDescription>{`${files.length} FILES SELECTED, ${(
              Array.from(files).reduce((acc, file) => acc + file.size, 0) /
              (1024 * 1024)
            ).toFixed(2)} MB TOTAL.`}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div
                className="h-20 border-2 border-dashed active:bg-border/30  hover:bg-border/30 rounded-md flex justify-center items-center cursor-pointer  subtle-stripes"
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                DRAG FILES OR CLICK HERE
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
                multiple
              />
            </div>
          </CardContent>
        </Card>

        <Card className="sm:row-span-3 sm:col-span-3">
          <CardHeader>
            <CardTitle>CREATE NOTE</CardTitle>
          </CardHeader>

          <CardContent>
            <form>
              <div className="grid gap-4 h-full">
                <div className="grid gap-2">
                  <Label htmlFor="code">TITLE</Label>
                  <Input type="text" />
                </div>
                <div className="grid gap-2 h-full">
                  <Label htmlFor="password">CONTENT</Label>
                  <Textarea className="resize-none h-50" />
                </div>
                <Button asChild className="w-full gap-2" type="submit">
                  <Link href="/dashboard">SUBMIT</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="sm:col-span-4">
          <CardHeader>
            <CardTitle>SHARE FILES & NOTES</CardTitle>
            <CardDescription>0 FILES, 0 NOTES SELECTED.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full">SELECT</Button>
              <Button className="w-full">SHARE</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-4">
          <CardHeader>
            <CardTitle>RECIEVE FILES</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex justify-between items-center gap-2">
                <InputOTP maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <Button type="submit">RECIEVE</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
