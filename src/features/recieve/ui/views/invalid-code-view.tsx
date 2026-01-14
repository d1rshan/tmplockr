import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { XCircle } from "lucide-react";

export function InvalidCodeView() {
  return (
    <div className="flex min-h-screen justify-center items-center p-4">
      <Card className="max-w-md w-full text-center border-destructive/50 shadow-lg shadow-destructive/10">
        <CardHeader className="flex flex-col items-center gap-2">
          <XCircle className="size-12 text-destructive" />
          <CardTitle className="text-2xl">INVALID CODE</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-muted-foreground">
            The code you entered is invalid, expired, or does not exist. Please double-check the code and try again.
          </p>
          <Button asChild className="w-full" variant="secondary">
            <Link href="/">RETURN HOME</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
