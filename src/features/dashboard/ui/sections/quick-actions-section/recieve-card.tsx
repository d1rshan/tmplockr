"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function RecieveCard() {
  const [otpValue, setOtpValue] = useState("");
  const router = useRouter();

  const handleReceive = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length === 4) {
      router.push(`/recieve/${otpValue}`);
    }
  };

  return (
    <Card className="sm:col-span-4">
      <CardHeader>
        <CardTitle>RECIEVE FILES</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleReceive}>
          <div className="flex justify-between items-center gap-2">
            <InputOTP
              maxLength={4}
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
            >
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
  );
}
