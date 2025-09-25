import { FilesNotesSharesSection } from "../sections/files-notes-shares-section";
import { QuickActionsSection } from "../sections/quick-actions-section";
import { UsageDetailsSection } from "../sections/usage-details-section";

export const DashboardView = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <UsageDetailsSection />
      <QuickActionsSection />
      <FilesNotesSharesSection />
    </div>
  );
};
