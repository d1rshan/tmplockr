import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const logo = `
████████╗███╗   ███╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗██████╗ 
╚══██╔══╝████╗ ████║██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗
   ██║   ██╔████╔██║██████╔╝██║     ██║   ██║██║     █████╔╝ ██████╔╝
   ██║   ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║██║     ██╔═██╗ ██╔══██╗
   ██║   ██║ ╚═╝ ██║██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║
   ╚═╝   ╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝
  `;

export const Navbar = () => {
  return (
    <nav className="z-10 fixed top-0 left-0 w-full bg-[#ECEEF0]/65 dark:bg-[#1E1E24]/65 backdrop-blur-md flex items-center justify-between p-2 border-b-[0.5px]">
      <div className="flex-1"></div>

      <div className="flex-1 flex justify-center">
        <pre className="ascii-art text-[5px] select-none">{logo}</pre>
      </div>

      <div className="flex-1 flex justify-end gap-2 items-center">
        <ModeToggle />
        <Button variant="outline">SIGN OUT</Button>
      </div>
    </nav>
  );
};
