import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginForm = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>LOG IN</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">USERNAME</Label>
              <Input type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">PASSWORD </Label>
              <Input type="text" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" type="submit">
          <Link href="/dashboard">ENTER DASHBOARD</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
