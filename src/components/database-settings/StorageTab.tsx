
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { LocalStorageDB } from "@/utils/localStorage";
import { Download, Upload, Database, Calendar } from "lucide-react";

interface StorageTabProps {
  onImport: () => void;
}

const StorageTab = ({ onImport }: StorageTabProps) => {
  const { toast } = useToast();
  const [backupTimestamp, setBackupTimestamp] = useState<string | null>(null);
  const [stats, setStats] = useState({ laporan: 0, anggota: 0 });

  useEffect(() => {
    // Load backup info and stats
    setBackupTimestamp(LocalStorageDB.getBackupTimestamp());
    const laporan = LocalStorageDB.getLaporan();
    const anggota = LocalStorageDB.getAnggota();
    setStats({ laporan: laporan.length, anggota: anggota.length });
  }, []);

  const handleExportData = () => {
    try {
      const data = LocalStorageDB.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fkdm-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Berhasil",
        description: "Data berhasil diekspor ke file JSON.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Gagal",
        description: "Terjadi kesalahan saat mengekspor data.",
      });
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        LocalStorageDB.importData(data);
        
        // Refresh stats
        const laporan = LocalStorageDB.getLaporan();
        const anggota = LocalStorageDB.getAnggota();
        setStats({ laporan: laporan.length, anggota: anggota.length });
        setBackupTimestamp(LocalStorageDB.getBackupTimestamp());
        
        toast({
          title: "Import Berhasil",
          description: "Data berhasil diimpor ke localStorage.",
        });
        onImport();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Import Gagal",
          description: "File tidak valid atau terjadi kesalahan.",
        });
      }
    };
    reader.readAsText(file);
  };

  const calculateStorageUsage = () => {
    // Estimate localStorage usage
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return (total / 1024).toFixed(2); // Convert to KB
  };

  return (
    <Card className="transition-colors">
      <CardHeader>
        <CardTitle>Pengaturan Penyimpanan</CardTitle>
        <CardDescription>
          Kelola backup database lokal sebelum terhubung ke Supabase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Local Storage Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Laporan</p>
                <p className="text-2xl font-bold">{stats.laporan}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Anggota</p>
                <p className="text-2xl font-bold">{stats.anggota}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Backup Terakhir</p>
                <p className="text-sm font-bold">
                  {backupTimestamp 
                    ? new Date(backupTimestamp).toLocaleDateString('id-ID')
                    : 'Belum ada'
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storage-type">Tipe Penyimpanan</Label>
          <Select defaultValue="local">
            <SelectTrigger id="storage-type">
              <SelectValue placeholder="Pilih tipe penyimpanan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local Storage (Browser)</SelectItem>
              <SelectItem value="relational" disabled>Database Relasional (Perlu Supabase)</SelectItem>
              <SelectItem value="document" disabled>Database Dokumen (Perlu Supabase)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Saat ini menggunakan localStorage sebagai backup sebelum terhubung ke Supabase
          </p>
        </div>

        <div className="space-y-2">
          <Label>Backup & Import Data</Label>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportData} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <div className="flex-1">
              <Input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
                id="import-file"
              />
              <Button asChild variant="outline" className="w-full">
                <label htmlFor="import-file" className="cursor-pointer flex items-center justify-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </label>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Export: unduh backup data dalam format JSON<br/>
            Import: unggah file backup JSON untuk memulihkan data
          </p>
        </div>

        <div className="space-y-2">
          <Label>Penggunaan Penyimpanan Browser</Label>
          <div className="h-4 w-full bg-muted rounded-full overflow-hidden dark:bg-muted/40">
            <div
              className="h-full bg-fkdm-red dark:bg-fkdm-red"
              style={{ width: "15%" }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span>~{calculateStorageUsage()} KB digunakan</span>
            <span>~5 MB tersedia (estimasi browser)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cleanup-data">Pembersihan Data</Label>
          <Select defaultValue="manual">
            <SelectTrigger id="cleanup-data">
              <SelectValue placeholder="Pilih frekuensi pembersihan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="monthly" disabled>Bulanan (Perlu Supabase)</SelectItem>
              <SelectItem value="quarterly" disabled>Triwulanan (Perlu Supabase)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Pembersihan otomatis akan tersedia setelah terhubung ke Supabase
          </p>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button 
            variant="outline" 
            className="hover:bg-muted/60 dark:hover:bg-muted/30"
            onClick={() => {
              localStorage.clear();
              LocalStorageDB.initializeData();
              window.location.reload();
            }}
          >
            Reset Data
          </Button>
          <Button disabled>Simpan Pengaturan</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageTab;
