"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/features/user/hooks/use-user";

export const UserCard = () => {
  const { data: user } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Details</CardTitle>
        <CardDescription>FILES LIMIT: 50MB btw NOTES: 10</CardDescription>
      </CardHeader>
      <CardContent>
        {user && user.notesUsed} Notes Used!
        <br />
        {user && (user.storageUsed / (1024 * 1024)).toFixed(2)}MB Storage Used!
      </CardContent>
    </Card>
  );
};
