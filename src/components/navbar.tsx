"use client";

import { LogOut } from "lucide-react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "./ui/button";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { logo } from "@/lib/consts";

export const Navbar = () => {
  const pathname = usePathname();

  const isDashboard = pathname === `/dashboard`;
  return (
    <nav className="z-10 fixed top-0 left-0 w-full bg-background/40 backdrop-blur-md flex items-center justify-between p-2 border-b-[0.5px]">
      <div className="flex-1"></div>

      {isDashboard && (
        <div className="flex-1 flex justify-center items-center">
          <pre className="ascii-art text-[4px] sm:text-[5px] select-none">
            <a href="/dashboard">{logo}</a>
          </pre>
        </div>
      )}
      <div className="flex-1 flex justify-end sm:gap-2 gap-0 items-center">
        {isDashboard && <SignoutButton />}

        <AnimatedThemeToggler />
      </div>
    </nav>
  );
};

const SignoutButton = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSignout() {
    try {
      setIsLoading(true);
      await axios.post("/api/sign-out")
      router.push("/")
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
