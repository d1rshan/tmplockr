import { ModalButton } from "@/components/left-slide-modal";
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
             bg-[size:55px_55px] mask-radial-from-20"
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
    <div className="flex flex-col items-center justify-center ">
      <pre className="[line-height:1] text-neutral-50">{hero}</pre>
      <div className="flex gap-x-2 ">
        <ModalButton>Enter</ModalButton>
        <ModalButton>Recieve</ModalButton>
      </div>
    </div>
  );
};

export const FancyButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <a href="#_" className="relative inline-block text-lg group font-mono">
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight  transition-colors duration-300 ease-out border-2 rounded-lg group-hover:text-black">
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-background"></span>
        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-neutral-100 group-hover:-rotate-180 ease"></span>
        <span className="relative">{children}</span>
      </span>
      <span
        className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-background rounded-lg group-hover:mb-0 group-hover:mr-0"
        data-rounded="rounded-lg"
      ></span>
    </a>
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
