
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";

// Import components
import ConnectionTab from "@/components/database-settings/ConnectionTab";
import SyncTab from "@/components/database-settings/SyncTab";
import BackupTab from "@/components/database-settings/BackupTab";
import StorageTab from "@/components/database-settings/StorageTab";
import AdminTab from "@/components/database-settings/AdminTab";

// Import utility functions
import {
  handleSaveConnection,
  handleTestConnection,
  handleBackupNow,
  handleImport,
  handleSaveAdminSettings
} from "@/utils/database-settings-utils";

const DatabaseSettingsPage = () => {
  return (
    <AppLayout title="Pengaturan Sistem">
      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="connection">Koneksi</TabsTrigger>
          <TabsTrigger value="sync">Sinkronisasi</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="storage">Penyimpanan</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <ConnectionTab 
            onSaveConnection={handleSaveConnection} 
            onTestConnection={handleTestConnection} 
          />
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <SyncTab />
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <BackupTab onBackupNow={handleBackupNow} />
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <StorageTab onImport={handleImport} />
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <AdminTab onSaveAdminSettings={handleSaveAdminSettings} />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default DatabaseSettingsPage;
