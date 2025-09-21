import { FilesNotesSharesCard } from "./files-notes-shares-card";
import { QuickActionsCard } from "./quick-actions-card";
import { UsageDetailsCard } from "./usage-details-card";

export const DashboardBento = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <UsageDetailsCard />
      <QuickActionsCard />
      <FilesNotesSharesCard />
    </div>
  );
};
