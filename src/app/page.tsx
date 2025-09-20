import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-6xl mx-auto">
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <Hero />
      </div>
      <div
        className="min-h-screen flex flex-col justify-start mt-20 items-center"
        id="enter"
      >
        <LoginForm />
      </div>
      <GridBackground />
    </div>
  );
}

export const GridBackground = () => {
  return (
    <div
      className="-z-10  inset-x-0 mx-auto max-w-6xl h-screen absolute top-0 left-0 bg-background [--line-color:#EDEDED] dark:[--line-color:#202023]
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
    <div className="flex flex-col items-center justify-center">
      <pre className="ascii-art text-[6px] sm:text-xs lg:text-sm whitespace-pre-wrap ">
        {hero}
      </pre>

      <div className="flex gap-x-2">
        <Button asChild>
          <Link href={"#enter"}>ENTER</Link>
        </Button>
        <Button>RECIEVE</Button>
      </div>
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="z-10 fixed bg-background/80 backdrop-blur-md flex justify-end p-2  border-b-[0.5px] border-neutral-200 dark:border-neutral-800 inset-x-0">
      <ModeToggle />
    </nav>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  return (
    <Card className="w-full max-w-lg shadow-none bg-background">
      <CardHeader className="relative">
        <CardTitle className="font-bold font-mono">LOGIN</CardTitle>
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
