"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="px-4 pt-17 max-w-6xl mx-auto grid grid-cols-1 gap-4">
      <UsageDetailsCard />
      <QuickActionsCard />
      <Card>
        <CardHeader separator>
          <CardTitle>YOUR FILES & NOTES</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SimpleFileTable showCheckboxes rowsPerPage={5} />
          <SimpleFileTable rowsPerPage={5} />
        </CardContent>
      </Card>
    </div>
  );
}

export const UsageDetailsCard = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>USAGE DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>USED STORAGE</CardTitle>
          </CardHeader>
          <CardContent>20/100 MB</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NOTES CREATED</CardTitle>
          </CardHeader>
          <CardContent>2/10</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ACTIVE SHARES</CardTitle>
          </CardHeader>
          <CardContent>2/5</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>QUICK ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <Card className="sm:col-span-3 sm:row-span-3">
          <CardHeader>
            <CardTitle>UPLOAD FILES</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant={"outline"} className="w-full">
              SELECT
            </Button>
          </CardContent>
        </Card>
        <Card className="sm:row-span-4 sm:col-span-2">
          <CardHeader>
            <CardTitle>CREATE NOTE</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6 h-full">
                <div className="grid gap-2">
                  <Label htmlFor="code">TITLE</Label>
                  <Input type="text" />
                </div>
                <div className="grid gap-2 h-full">
                  <Label htmlFor="password">CONTENT</Label>
                  <Textarea className="resize-none w-full h-full max-h-10" />
                </div>
                <Button
                  asChild
                  variant={"outline"}
                  className="w-full gap-2"
                  type="submit"
                >
                  <Link href="/dashboard">SUBMIT</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="sm:col-span-3 sm:row-span-1">
          <CardHeader>
            <CardTitle>RECIEVE FILES</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex justify-between items-center gap-2">
                <InputOTP maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <Button variant={"outline"} type="submit">
                  RECIEVE
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const files = [
  "project-report.pdf",
  "meeting-notes.docx",
  "budget-summary-q1.xlsx",
  "user-interface-design.sketch",
  "server-configuration.env",
  "client-feedback.txt",
];

type SimpleFileTableProps = {
  showCheckboxes?: boolean;
  rowsPerPage?: number;
};

export const SimpleFileTable = ({
  showCheckboxes = false,
  rowsPerPage = 3,
}: SimpleFileTableProps) => {
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<number[]>([]);

  const totalPages = Math.ceil(files.length / rowsPerPage);
  const start = page * rowsPerPage;
  const paginatedFiles = files.slice(start, start + rowsPerPage);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(paginatedFiles.map((_, i) => start + i));
    } else {
      setSelected([]);
    }
  };

  const toggleRow = (index: number, checked: boolean) => {
    if (checked) {
      setSelected((prev) => [...prev, index]);
    } else {
      setSelected((prev) => prev.filter((x) => x !== index));
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {showCheckboxes && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      selected.length === paginatedFiles.length &&
                      paginatedFiles.length > 0
                    }
                    onCheckedChange={(value) => toggleAll(!!value)}
                  />
                </TableHead>
              )}
              <TableHead>FILES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFiles.length > 0 ? (
              paginatedFiles.map((file, i) => {
                const globalIndex = start + i;
                return (
                  <TableRow key={globalIndex}>
                    {showCheckboxes && (
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(globalIndex)}
                          onCheckedChange={(value) =>
                            toggleRow(globalIndex, !!value)
                          }
                        />
                      </TableCell>
                    )}
                    <TableCell>{file}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={showCheckboxes ? 2 : 1}
                >
                  No files found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Prev
        </Button>
        <span className="text-sm">
          Page {page + 1} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
