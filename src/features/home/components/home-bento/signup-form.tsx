import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SignupForm = () => {
  return (
    <Card className="row-span-2">
      <CardHeader separator>
        <CardTitle>SIGN UP</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="code">USERNAME</Label>
              <Input type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">PASSWORD</Label>
              <Input type="text" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">RE-ENTER PASSWORD</Label>
              <Input type="text" />
            </div>
            <Button className="w-full" type="submit">
              SIGN UP
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
