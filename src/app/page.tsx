import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-6xl mx-auto">
      <Navbar />
      <GridBackground />
      <Hero />
      <div className="mt-10 mb-20  px-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        <RecieveForm />
        <SignupForm />
        <LoginForm />
      </div>
    </div>
  );
}

export const GridBackground = () => {
  return (
    <div
      className="-z-10  inset-x-0 mx-auto max-w-6xl h-screen fixed top-0 left-0 bg-background [--line-color:#EDEDED] dark:[--line-color:#202023]
        bg-[linear-gradient(0deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent)]
        bg-[size:55px_55px] mask-radial-from-20 "
    />
  );
};

export const Hero = () => {
  const hero = `
████████╗███╗   ███╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗██████╗ 
╚══██╔══╝████╗ ████║██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗
   ██║   ██╔████╔██║██████╔╝██║     ██║   ██║██║     █████╔╝ ██████╔╝
   ██║   ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║██║     ██╔═██╗ ██╔══██╗
   ██║   ██║ ╚═╝ ██║██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║
   ╚═╝   ╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝
  `;

  return (
    <div className="mt-20 text-center">
      <pre className="ascii-art text-[6px] sm:text-xs lg:text-sm whitespace-pre-wrap ">
        {hero}
      </pre>
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="z-10 fixed top-0 left-0 bg-background/80 backdrop-blur-md flex justify-end p-2  border-b-[0.5px] border-neutral-200 dark:border-neutral-800 inset-x-0">
      <ModeToggle />
    </nav>
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

export const LoginForm = () => {
  return (
    <Card className=" shadow-none bg-background">
      <CardHeader separator className="relative">
        <CardTitle className="font-bold font-mono">LOG IN</CardTitle>
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

              {/* <InputOTP maxLength={4}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP> */}
            </div>
            <Button variant={"outline"} className="w-full gap-2" type="submit">
              ENTER DASHBOARD
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const SignupForm = () => {
  return (
    <Card className="shadow-none bg-background row-span-2">
      <CardHeader separator className="relative">
        <CardTitle className="font-bold font-mono">SIGN UP</CardTitle>
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
            <div className="grid gap-2">
              <Label htmlFor="password">RE-ENTER PASSWORD </Label>
              <Input type="text" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className=" h-full flex items-end">
        <Button variant={"outline"} className="w-full gap-2" type="submit">
          SIGN UP
        </Button>
      </CardFooter>
    </Card>
  );
};

export const RecieveForm = () => {
  return (
    <Card className="shadow-none bg-background">
      <CardHeader separator className="relative">
        <CardTitle className="font-bold font-mono">RECIEVE FILES</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          {/* <div className="grid gap-6"> */}
          {/* <div className="grid gap-2"> */}
          {/* <Label htmlFor="password">ENTER CODE</Label> */}

          <div className="flex justify-between gap-2">
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <Button variant={"outline"} className="" type="submit">
              RECIEVE
            </Button>
          </div>
          {/* </div> */}
          {/* </div> */}
        </form>
      </CardContent>
    </Card>
  );
};
