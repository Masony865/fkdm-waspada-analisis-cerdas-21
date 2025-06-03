
import AdminUserTable from "./AdminUserTable";
import MemberTable from "./MemberTable";
import AdminSettingsForm from "./AdminSettingsForm";

interface AdminTabProps {
  onSaveAdminSettings: () => void;
}

const AdminTab = ({ onSaveAdminSettings }: AdminTabProps) => {
  return (
    <div className="space-y-6">
      <AdminUserTable />
      <MemberTable />
      <AdminSettingsForm onSaveAdminSettings={onSaveAdminSettings} />
    </div>
  );
};

export default AdminTab;
