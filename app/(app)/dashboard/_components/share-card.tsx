"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserShares } from "@/features/shares/hooks/use-shares";

export const ShareCard = () => {
  const { data: shares = [] } = useUserShares();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Files & Notes</CardTitle>
        <CardDescription>..</CardDescription>
      </CardHeader>
      <CardContent>
        {shares.map((share) => (
          <div key={share.code}>{share.code}</div>
        ))}
      </CardContent>
    </Card>
  );
};
