"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <CardTitle>FILES, NOTES & SHARES</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DataTable showCheckboxes data={data} title="FILES" rowsPerPage={5} />
          <DataTable data={data} title="NOTES" rowsPerPage={5} />
          <div className="sm:col-span-2">
            <DataTable data={data} title="SHARES" rowsPerPage={5} />
          </div>
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

export const QuickActionsCard = () => {
  return (
    <Card>
      <CardHeader separator>
        <CardTitle>QUICK ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-7 gap-4">
        <Card className="sm:col-span-4">
          <CardHeader>
            <CardTitle>UPLOAD FILES</CardTitle>
            <CardDescription>0 FILES SELECTED, 80MB LEFT.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              <div className="border border-dashed h-20 rounded-md flex justify-center items-center cursor-pointer bg-[#ECEEF0] dark:bg-[#1E1E24]">
                DRAG FILES OR CLICK HERE
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:row-span-3 sm:col-span-3">
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
                  <Textarea className="resize-none h-50" />
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
        <Card className="sm:col-span-4">
          <CardHeader>
            <CardTitle>SHARE FILES & NOTES</CardTitle>
            <CardDescription>0 FILES, 0 NOTES SELECTED.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant={"outline"} className="w-full">
                SELECT
              </Button>
              <Button variant={"outline"} className="w-full">
                SHARE
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-4">
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

const data = [
  "project-report.pdf",
  "meeting-notes.docx",
  "budget-summary-q1.xlsx",
  "user-interface-design.sketch",
  "server-configuration.env",
  "client-feedback.txt",
];

type DataTableProps = {
  title: string;
  data: string[];
  showCheckboxes?: boolean;
  rowsPerPage?: number;
};

export const DataTable = ({
  title,
  data,
  showCheckboxes = false,
  rowsPerPage = 3,
}: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<number[]>([]);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const start = page * rowsPerPage;
  const paginatedData = data.slice(start, start + rowsPerPage);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(paginatedData.map((_, i) => start + i));
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
            <TableRow className="border-0">
              {showCheckboxes && (
                <TableHead>
                  <Checkbox
                    checked={
                      selected.length === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onCheckedChange={(value) => toggleAll(!!value)}
                  />
                </TableHead>
              )}
              <TableHead>{title}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((file, i) => {
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
