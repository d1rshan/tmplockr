"use client";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

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
    <Button size="sm" onClick={handleSignout} disabled={isLoading}>
      Sign Out
    </Button>
  );
};
