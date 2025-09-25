"use client";

import { LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

const logo = `
████████╗███╗   ███╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗██████╗ 
╚══██╔══╝████╗ ████║██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔══██╗
   ██║   ██╔████╔██║██████╔╝██║     ██║   ██║██║     █████╔╝ ██████╔╝
   ██║   ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║██║     ██╔═██╗ ██╔══██╗
   ██║   ██║ ╚═╝ ██║██║     ███████╗╚██████╔╝╚██████╗██║  ██╗██║  ██║
   ╚═╝   ╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝
  `;

export const Navbar = () => {
  const pathname = usePathname();

  const isDashboard = pathname === `/dashboard`;
  return (
    <nav className="z-10 fixed top-0 left-0 w-full bg-background/40 backdrop-blur-md flex items-center justify-between p-2 border-b-[0.5px]">
      <div className="flex-1"></div>

      {isDashboard && (
        <div className="flex-1 flex justify-center items-center">
          <pre className="ascii-art text-[3px] sm:text-[5px] select-none">
            {logo}
          </pre>
        </div>
      )}
      <div className="flex-1 flex justify-end gap-2 items-center">
        {isDashboard && <SignoutButton />}
        <ModeToggle />
      </div>
    </nav>
  );
};

export const SignoutButton = () => {
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSignout() {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.log("Error in handleSignout", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      size="sm"
      variant={"ghost"}
      onClick={handleSignout}
      disabled={isLoading}
    >
      <LogOut />
    </Button>
  );
};
