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

export const RecieveForm = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>RECIEVE FILES</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex justify-between">
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <Button>RECIEVE</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
