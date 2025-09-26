import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CreateNoteCard } from "./create-note-card";
import { UploadFilesCard } from "./upload-files-card";
import { verifySession } from "@/lib/verify-session";
import { getUsageDetails } from "@/features/dashboard/data";

export async function QuickActionsSection() {
  const userId = await verifySession();
  const { notesUsed } = await getUsageDetails(userId);

  return (
    <Card>
      <CardHeader separator>
        <CardTitle>QUICK ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-7 gap-4">
        <UploadFilesCard />
        <CreateNoteCard notesUsed={notesUsed} />

        <Card className="sm:col-span-4">
          <CardHeader>
            <CardTitle>SHARE FILES & NOTES</CardTitle>
            <CardDescription>0 FILES, 0 NOTES SELECTED.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full" disabled>
                SELECT
              </Button>
              <Button className="w-full" disabled>
                SHARE
              </Button>
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
                <Button type="submit" disabled>
                  RECIEVE
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
