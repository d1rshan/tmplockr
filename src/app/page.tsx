import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <Hero />
      </div>
      <div
        className="min-h-screen flex flex-col justify-center items-center"
        id="enter"
      >
        ENTER
      </div>
      <GridBackground />
    </div>
  );
}

export const GridBackground = () => {
  return (
    <div
      className="-z-10 w-full h-screen fixed top-0 left-0 bg-background [--line-color:#EDEDED] dark:[--line-color:#202023]
        bg-[linear-gradient(0deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent)]
        bg-[size:55px_55px] mask-radial-from-50 "
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
    <nav className="fixed bg-background/80 backdrop-blur-md flex justify-end p-2  border-b-[0.5px] border-neutral-200 dark:border-neutral-800 inset-x-0">
      <ModeToggle />
    </nav>
  );
};
