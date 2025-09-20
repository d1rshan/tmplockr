import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="px-4 pt-17 max-w-6xl mx-auto grid grid-cols-1 gap-4">
      <UsageDetailsCard />
      <QuickActionsCard />
      <Card>
        <CardHeader separator>
          <CardTitle>YOUR FILES & NOTES</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export const UsageDetailsCard = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>USAGE DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>USED STORAGE</CardTitle>
          </CardHeader>
          <CardContent>20/100 MB</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NOTES CREATED</CardTitle>
          </CardHeader>
          <CardContent>2/10</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ACTIVE SHARES</CardTitle>
          </CardHeader>
          <CardContent>2/5</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>QUICK ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <Card className="sm:col-span-3 sm:row-span-3">
          <CardHeader>
            <CardTitle>UPLOAD FILES</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant={"outline"} className="w-full">
              SELECT
            </Button>
          </CardContent>
        </Card>
        <Card className="sm:row-span-4 sm:col-span-2">
          <CardHeader>
            <CardTitle>CREATE NOTE</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6 h-full">
                <div className="grid gap-2">
                  <Label htmlFor="code">TITLE</Label>
                  <Input type="text" />
                </div>
                <div className="grid gap-2 h-full">
                  <Label htmlFor="password">CONTENT</Label>
                  <Textarea className="resize-none w-full h-full max-h-10" />
                </div>
                <Button
                  asChild
                  variant={"outline"}
                  className="w-full gap-2"
                  type="submit"
                >
                  <Link href="/dashboard">SUBMIT</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="sm:col-span-3 sm:row-span-1">
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
                <Button variant={"outline"} type="submit">
                  RECIEVE
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
