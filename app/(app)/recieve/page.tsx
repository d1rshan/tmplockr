"use client";

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
import { useState } from "react";
import { number } from "zod";

export default function RecievePage() {
  const [code, setCode] = useState<string>("");

  const handleSubmit = () => {
    const otp = number(code);
    console.log(otp);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-xs">
        <CardHeader>
          <CardTitle>Enter Recieve Code</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
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
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
