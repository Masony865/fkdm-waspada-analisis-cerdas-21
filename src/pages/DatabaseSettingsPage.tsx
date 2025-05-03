
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/layout/AppLayout";
import { PlusCircle } from "lucide-react";

const DatabaseSettingsPage = () => {
  const { toast } = useToast();
  const [dbType, setDbType] = useState("mysql");
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const [connectionString, setConnectionString] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [database, setDatabase] = useState("");

  const handleSaveConnection = () => {
    toast({
      title: "Pengaturan Tersimpan",
      description: "Konfigurasi database telah berhasil disimpan.",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Koneksi Berhasil",
      description: "Berhasil terhubung ke database.",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup Dimulai",
      description: "Proses backup database sedang berjalan.",
    });
  };

  const handleImport = () => {
    toast({
      title: "Impor Berhasil",
      description: "Data berhasil diimpor ke database.",
    });
  };

  return (
    <AppLayout title="Pengaturan Database">
      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="connection">Koneksi</TabsTrigger>
          <TabsTrigger value="sync">Sinkronisasi</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="storage">Penyimpanan</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Koneksi Database</CardTitle>
              <CardDescription>
                Konfigurasikan koneksi ke database eksternal atau gunakan
                database lokal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-type">Tipe Database</Label>
                <Select
                  value={dbType}
                  onValueChange={setDbType}
                >
                  <SelectTrigger id="db-type">
                    <SelectValue placeholder="Pilih tipe database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysql">MySQL / MariaDB</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="sqlite">SQLite (Lokal)</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {dbType === "sqlite" ? (
                <div className="space-y-2">
                  <Label htmlFor="database-file">Lokasi File Database</Label>
                  <div className="flex gap-2">
                    <Input
                      id="database-file"
                      placeholder="Pilih lokasi file database"
                      value={database}
                      onChange={(e) => setDatabase(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">Browse</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="connection-string">
                      Connection String (Opsional)
                    </Label>
                    <Input
                      id="connection-string"
                      placeholder="contoh: mysql://user:password@localhost:3306/database"
                      value={connectionString}
                      onChange={(e) => setConnectionString(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Isi connection string atau isi detail koneksi di bawah
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="host">Host</Label>
                      <Input
                        id="host"
                        placeholder="localhost"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        placeholder={dbType === "mysql" ? "3306" : "5432"}
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="database">Nama Database</Label>
                      <Input
                        id="database"
                        placeholder="nama_database"
                        value={database}
                        onChange={(e) => setDatabase(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleTestConnection}>Test Koneksi</Button>
                <Button variant="outline" onClick={handleSaveConnection}>
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Sinkronisasi</CardTitle>
              <CardDescription>
                Konfigurasikan sinkronisasi data antara API dan database lokal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-sync"
                  checked={autoSyncEnabled}
                  onCheckedChange={setAutoSyncEnabled}
                />
                <Label htmlFor="auto-sync">Aktifkan sinkronisasi otomatis</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sync-interval">Interval Sinkronisasi</Label>
                <Select disabled={!autoSyncEnabled} defaultValue="hourly">
                  <SelectTrigger id="sync-interval">
                    <SelectValue placeholder="Pilih interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">Setiap 15 menit</SelectItem>
                    <SelectItem value="30min">Setiap 30 menit</SelectItem>
                    <SelectItem value="hourly">Setiap jam</SelectItem>
                    <SelectItem value="daily">Setiap hari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sync-sources">Sumber Data API</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <Input
                      id="api-url-1"
                      placeholder="https://data.go.id/api/v1/dataset"
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" className="shrink-0">
                      Hapus
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <Input
                      id="api-url-2"
                      placeholder="https://api.bps.go.id/data/v1/statistics"
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" className="shrink-0">
                      Hapus
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Tambah Sumber API
                </Button>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button>Sinkronisasi Sekarang</Button>
                <Button variant="outline">Simpan Pengaturan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
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
                <Button onClick={handleBackupNow}>Backup Sekarang</Button>
                <Button variant="outline">Simpan Pengaturan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Penyimpanan</CardTitle>
              <CardDescription>
                Konfigurasikan jenis penyimpanan dan batas penggunaan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storage-type">Tipe Penyimpanan</Label>
                <Select defaultValue="relational">
                  <SelectTrigger id="storage-type">
                    <SelectValue placeholder="Pilih tipe penyimpanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relational">Database Relasional</SelectItem>
                    <SelectItem value="document">Database Dokumen</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="import-data">Impor Data</Label>
                <div className="flex gap-2">
                  <Input
                    id="import-file"
                    type="file"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={handleImport}>
                    Impor
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Format yang didukung: CSV, JSON, SQL
                </p>
              </div>

              <div className="space-y-2">
                <Label>Penggunaan Penyimpanan</Label>
                <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-fkdm-red"
                    style={{ width: "35%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>3.5 GB digunakan</span>
                  <span>10 GB total</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cleanup-data">Pembersihan Data</Label>
                <Select defaultValue="never">
                  <SelectTrigger id="cleanup-data">
                    <SelectValue placeholder="Pilih frekuensi pembersihan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Tidak pernah</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                    <SelectItem value="quarterly">Triwulanan</SelectItem>
                    <SelectItem value="yearly">Tahunan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Data yang lebih lama dari periode ini akan dihapus otomatis
                </p>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline">Bersihkan Cache</Button>
                <Button>Simpan Pengaturan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default DatabaseSettingsPage;
