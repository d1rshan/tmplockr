import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifySession } from "@/lib/verify-session";
import { getUsageDetails } from "../../data";
import { toMB } from "@/lib/utils";
import { APP_LIMITS } from "@/lib/consts";

export async function UsageDetailsSection() {
  const userId = await verifySession();
  const { storageUsed, notesUsed } = await getUsageDetails(userId);

  return (
    <Card>
      <CardHeader separator>
        <CardTitle>USAGE DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle>USED STORAGE</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {toMB(storageUsed)}/{APP_LIMITS.STORAGE / (1024 * 1024)} MB
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <CardTitle>NOTES CREATED</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {notesUsed}/{APP_LIMITS.NOTES}
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <CardTitle>ACTIVE SHARES</CardTitle>
          </CardHeader>
          <CardContent className="hidden sm:block text-muted-foreground">?/5</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
