import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <Hero />
      </div>
      <GridBackground />
    </div>
  );
}

export const GridBackground = () => {
  return (
    <div
      className="-z-10 w-full h-screen fixed top-0 left-0 bg-background [--line-color:var(--color-neutral-800)]
              bg-[linear-gradient(0deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent)] 
             bg-[size:55px_55px] mask-radial-from-50"
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
      <pre className="[line-height:1] text-neutral-50">{hero}</pre>
      <div className="flex gap-x-2 ">
        <Button>Send Files</Button>
        <Button>Recieve Files</Button>
      </div>
    </div>
  );
};
export const Navbar = () => {
  return (
    <nav className="z-10 sticky top-0 md:top-2 px-4 py-2 border bg-background-400/70 backdrop-blur-md  md:rounded-xl  flex justify-end items-center">
      {/* <span className="font-bold text-lg font-mono">TmpLockr.</span> */}
      <ModeToggle />
    </nav>
  );
};
