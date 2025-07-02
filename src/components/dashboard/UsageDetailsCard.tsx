import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HardDrive, FileText } from "lucide-react";
import React from "react";

interface UsageDetailsCardProps {
  usageData: {
    files: { used: number; limit: number; unit: string };
    notes: { used: number; limit: number; unit: string };
  };
}

export const UsageDetailsCard: React.FC<UsageDetailsCardProps> = ({
  usageData,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Usage Details</CardTitle>
      <CardDescription>Your current storage and note usage</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Storage Usage */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <HardDrive className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">File Storage</h3>
              <p className="text-sm text-slate-500">
                {usageData.files.used.toFixed(2)}/{usageData.files.limit}{" "}
                {usageData.files.unit} used
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Storage Usage</span>
              <span className="text-sm text-slate-500">
                {Math.round(
                  (usageData.files.used / usageData.files.limit) * 100
                )}
                %
              </span>
            </div>
            <Progress
              value={(usageData.files.used / usageData.files.limit) * 100}
              className="h-2"
            />
            <p className="text-xs text-slate-400">
              {(usageData.files.limit - usageData.files.used).toFixed(2)}{" "}
              {usageData.files.unit} remaining
            </p>
          </div>
        </div>
        {/* Notes Usage */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Notes</h3>
              <p className="text-sm text-slate-500">
                {usageData.notes.used}/{usageData.notes.limit}{" "}
                {usageData.notes.unit}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Note Usage</span>
              <span className="text-sm text-slate-500">
                {Math.round(
                  (usageData.notes.used / usageData.notes.limit) * 100
                )}
                %
              </span>
            </div>
            <Progress
              value={(usageData.notes.used / usageData.notes.limit) * 100}
              className="h-2"
            />
            <p className="text-xs text-slate-400">
              {usageData.notes.limit - usageData.notes.used}{" "}
              {usageData.notes.unit} remaining
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
