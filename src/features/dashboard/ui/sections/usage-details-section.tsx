import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifySessionRedirect } from "@/lib/auth-checks";
import { getUsageDetails } from "../../data";
import { toMB } from "@/lib/utils";

export async function UsageDetailsSection() {
  const userId = await verifySessionRedirect();
  const { storageUsed, notesUsed } = await getUsageDetails(userId);

  return (
    <Card>
      <CardHeader separator>
        <CardTitle>USAGE DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>USED STORAGE</span>
              <span className="sm:hidden font-normal">
                {toMB(storageUsed)}/100 MB
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="hidden sm:block">
            {toMB(storageUsed)}/100 MB
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>NOTES CREATED</span>
              <span className="sm:hidden">{notesUsed}/10</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="hidden sm:block">{notesUsed}/10</CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>ACTIVE SHARES</span>
              <span className="sm:hidden">?/5</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="hidden sm:block">?/5</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
