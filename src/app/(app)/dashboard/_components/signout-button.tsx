"use client";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export const SignoutButton = () => {
  const { signOut } = useClerk();

  async function handleSignout() {
    await signOut();
  }
  return (
    <Button size="sm" onClick={handleSignout}>
      Sign Out
    </Button>
  );
};
