import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen pt-20 max-w-6xl mx-auto">
      <Hero />
      <div className="hidden mt-10 mb-20 px-4 sm:grid gap-4 grid-cols-2">
        <RecieveForm />
        <SignupForm />
        <LoginForm />
      </div>
      <div className="sm:hidden mt-10 grid grid-cols-1 px-4 gap-4">
        <LoginForm />
        <RecieveForm />
        <SignupForm />
      </div>
    </div>
  );
}

const hero = `
████████╗███╗   ███╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗██████╗ 
╚══██╔══╝████╗ ████║██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗
   ██║   ██╔████╔██║██████╔╝██║     ██║   ██║██║     █████╔╝ ██████╔╝
   ██║   ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║██║     ██╔═██╗ ██╔══██╗
   ██║   ██║ ╚═╝ ██║██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║
   ╚═╝   ╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝
  `;

export const Hero = () => {
  return (
    <pre className="ascii-art text-[6px] sm:text-xs lg:text-sm whitespace-pre-wrap text-center">
      {hero}
    </pre>
  );
};

import {
  Card,
  CardContent,
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
import Link from "next/link";

export const LoginForm = () => {
  return (
    <Card className=" shadow-none bg-background text-sm ">
      <CardHeader separator className="relative">
        <CardTitle className="font-bold">LOG IN</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="code">USERNAME</Label>
              <Input type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">PASSWORD </Label>
              <Input type="text" />
            </div>
            <Button
              asChild
              variant={"outline"}
              className="w-full gap-2"
              type="submit"
            >
              <Link href="/dashboard">ENTER DASHBOARD</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const SignupForm = () => {
  return (
    <Card className="row-span-2">
      <CardHeader separator className="relative">
        <CardTitle className="font-bold">SIGN UP</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="code">USERNAME</Label>
              <Input type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">PASSWORD</Label>
              <Input type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">RE-ENTER PASSWORD</Label>
              <Input type="text" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="h-full flex items-end">
        <Button variant={"outline"} className="w-full gap-2" type="submit">
          SIGN UP
        </Button>
      </CardFooter>
    </Card>
  );
};

export const RecieveForm = () => {
  return (
    <Card className="shadow-none bg-background text-sm">
      <CardHeader separator className="relative">
        <CardTitle>RECIEVE FILES</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex justify-between gap-2">
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
  );
};
