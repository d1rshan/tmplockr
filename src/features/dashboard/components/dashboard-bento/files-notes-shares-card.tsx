"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const data = [
  "project-report.pdf",
  "meeting-notes.docx",
  "budget-summary-q1.xlsx",
  "user-interface-design.sketch",
  "server-configuration.env",
  "client-feedback.txt",
] as string[];

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
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);

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
              <TableHead className="flex items-center justify-between">
                <span>{title}</span>
                <div className="flex items-center justify-center ">
                  <Button
                    size="icon"
                    variant={"custom"}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    <ArrowLeft />
                  </Button>

                  <Button
                    size="icon"
                    variant={"custom"}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={page === totalPages - 1}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </TableHead>
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
                    <TableCell>{file.toUpperCase()}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={showCheckboxes ? 2 : 1}
                >
                  NO DATA
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
    </div>
  );
};

export const FilesNotesSharesCard = () => {
  return (
    <Card className="mb-4">
      <CardHeader separator>
        <CardTitle>FILES, NOTES & SHARES</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DataTable data={data} title="FILES" rowsPerPage={5} />
        <DataTable data={data} title="NOTES" rowsPerPage={5} />
        <div className="sm:col-span-2">
          <DataTable data={data} title="SHARES" rowsPerPage={5} />
        </div>
      </CardContent>
    </Card>
  );
};
