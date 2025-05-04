
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") as "light" | "dark" || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  // Apply theme when component mounts and when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AppLayout title="Pengaturan Sistem">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
      
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
