"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { File, Note } from "@/types";

export default function RecievePage() {
  const [code, setCode] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSubmit = async () => {
    if (code.length != 4) {
      return;
    }
    const res = await axios.get(`/api/shares/${code}`);

    setFiles(res.data.files);
    setNotes(res.data.notes);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle>Enter Recieve Code</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          {files.length == 0 && notes.length == 0 && (
            <InputOTP
              maxLength={4}
              value={code}
              onChange={(value: string) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          )}
          {(files.length > 0 || notes.length > 0) && (
            <div>
              {files.map((file) => (
                <div key={file.id}>{file.name}</div>
              ))}
              {notes.map((note) => (
                <div key={note.id}>{note.title}</div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={code.length != 4}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
