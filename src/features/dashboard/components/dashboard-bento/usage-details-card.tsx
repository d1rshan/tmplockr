import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const UsageDetailsCard = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>USAGE DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>USED STORAGE</span>
              <span className="sm:hidden font-normal">20/100 MB</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="hidden sm:block">20/100 MB</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>NOTES CREATED</span>
              <span className="sm:hidden">2/10</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="hidden sm:block">2/10</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>ACTIVE SHARES</span>
              <span className="sm:hidden">2/5</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="hidden sm:block">2/5</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
