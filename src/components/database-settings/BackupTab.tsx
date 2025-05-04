
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface BackupTabProps {
  onBackupNow: () => void;
}

const BackupTab = ({ onBackupNow }: BackupTabProps) => {
  const [backupEnabled, setBackupEnabled] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Backup</CardTitle>
        <CardDescription>
          Konfigurasikan backup otomatis dan manual untuk database.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-backups"
            checked={backupEnabled}
            onCheckedChange={setBackupEnabled}
          />
          <Label htmlFor="enable-backups">Aktifkan backup otomatis</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backup-frequency">Frekuensi Backup</Label>
          <Select disabled={!backupEnabled} defaultValue="daily">
            <SelectTrigger id="backup-frequency">
              <SelectValue placeholder="Pilih frekuensi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Setiap hari</SelectItem>
              <SelectItem value="weekly">Setiap minggu</SelectItem>
              <SelectItem value="monthly">Setiap bulan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backup-location">Lokasi Backup</Label>
          <Select disabled={!backupEnabled} defaultValue="local">
            <SelectTrigger id="backup-location">
              <SelectValue placeholder="Pilih lokasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Penyimpanan Lokal</SelectItem>
              <SelectItem value="cloud">Cloud Storage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="retention-period">Periode Retensi</Label>
          <Select disabled={!backupEnabled} defaultValue="30">
            <SelectTrigger id="retention-period">
              <SelectValue placeholder="Pilih periode retensi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 hari</SelectItem>
              <SelectItem value="30">30 hari</SelectItem>
              <SelectItem value="90">90 hari</SelectItem>
              <SelectItem value="365">1 tahun</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button onClick={onBackupNow}>Backup Sekarang</Button>
          <Button variant="outline">Simpan Pengaturan</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupTab;
