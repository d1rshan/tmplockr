import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      Home page
      <Button>
        <Link href={"/sign-in"}>Sign in</Link>
      </Button>
      <Button>
        <Link href={"/sign-in"}>Sign up</Link>
      </Button>
    </div>
  );
}
