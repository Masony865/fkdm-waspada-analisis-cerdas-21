
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Database, RefreshCw, Save } from "lucide-react";

const DatabaseSettingsPage = () => {
  const { toast } = useToast();
  const [selectedDbType, setSelectedDbType] = useState("rest");
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [backupEnabled, setBackupEnabled] = useState(true);

  const form = useForm({
    defaultValues: {
      apiUrl: "https://api.data.go.id/v1/",
      apiKey: "",
      username: "",
      password: "",
    },
  });

  const handleTest = () => {
    setIsTesting(true);

    // Simulate API call
    setTimeout(() => {
      setIsTesting(false);
      setIsConnected(true);
      toast({
        title: "Koneksi Berhasil",
        description: "Berhasil terhubung ke sumber data.",
      });
    }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Pengaturan Tersimpan",
        description: "Konfigurasi database telah berhasil disimpan.",
      });
    }, 1000);
  };

  const handleReset = () => {
    form.reset();
    setIsConnected(false);
    toast({
      title: "Pengaturan Direset",
      description: "Konfigurasi database telah direset.",
    });
  };

  return (
    <AppLayout title="Pengaturan Database">
      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connection">Koneksi</TabsTrigger>
          <TabsTrigger value="sync">Sinkronisasi</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="sources">Sumber Data</TabsTrigger>
        </TabsList>

        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Koneksi</CardTitle>
              <CardDescription>
                Konfigurasikan koneksi ke sumber data eksternal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="db-type">Jenis Penyimpanan</Label>
                <Select
                  value={selectedDbType}
                  onValueChange={setSelectedDbType}
                >
                  <SelectTrigger id="db-type">
                    <SelectValue placeholder="Pilih jenis database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rest">REST API</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgres">PostgreSQL</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Pilih jenis koneksi data yang akan digunakan.
                </p>
              </div>

              {selectedDbType === "rest" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-url">URL API</Label>
                      <Input
                        id="api-url"
                        placeholder="https://api.example.com/v1"
                        {...form.register("apiUrl")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Masukkan API Key"
                        {...form.register("apiKey")}
                      />
                    </div>
                  </div>
                </div>
              )}

              {(selectedDbType === "mysql" || selectedDbType === "postgres") && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="host">Host</Label>
                      <Input id="host" placeholder="localhost" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        placeholder={
                          selectedDbType === "mysql" ? "3306" : "5432"
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="database">Database</Label>
                      <Input id="database" placeholder="my_database" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schema">Schema</Label>
                      <Input id="schema" placeholder="public" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Username"
                        {...form.register("username")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...form.register("password")}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="border rounded-md p-4 bg-muted/50">
                <div className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span>
                    Status:{" "}
                    {isConnected
                      ? "Terhubung ke sumber data"
                      : "Tidak terhubung"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button onClick={handleTest} disabled={isTesting}>
                  {isTesting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Menguji...
                    </>
                  ) : (
                    "Tes Koneksi"
                  )}
                </Button>
              </div>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Sinkronisasi</CardTitle>
              <CardDescription>
                Konfigurasi jadwal dan metode sinkronisasi data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Aktifkan Sinkronisasi</h3>
                  <p className="text-sm text-muted-foreground">
                    Sinkronisasikan data secara otomatis dari sumber eksternal
                  </p>
                </div>
                <Switch
                  checked={syncEnabled}
                  onCheckedChange={setSyncEnabled}
                />
              </div>

              {syncEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sync-interval">Interval Sinkronisasi</Label>
                    <Select defaultValue="hourly">
                      <SelectTrigger id="sync-interval">
                        <SelectValue placeholder="Pilih interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5min">Setiap 5 menit</SelectItem>
                        <SelectItem value="15min">Setiap 15 menit</SelectItem>
                        <SelectItem value="30min">Setiap 30 menit</SelectItem>
                        <SelectItem value="hourly">Setiap jam</SelectItem>
                        <SelectItem value="daily">Setiap hari</SelectItem>
                        <SelectItem value="weekly">Setiap minggu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Opsi Sinkronisasi</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="conflict-strategy" defaultChecked />
                        <Label htmlFor="conflict-strategy">
                          Update jika terjadi konflik
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="delete-orphans" />
                        <Label htmlFor="delete-orphans">
                          Hapus data yang tidak ada di sumber
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="log-sync" defaultChecked />
                        <Label htmlFor="log-sync">Catat log sinkronisasi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="notify-failure" defaultChecked />
                        <Label htmlFor="notify-failure">
                          Notifikasi jika gagal
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4 bg-muted/50">
                    <p className="text-sm">
                      Sinkronisasi terakhir: 12 Mei 2025, 10:45 WIB
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: Berhasil (125 item diperbarui)
                    </p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  toast({
                    title: "Sinkronisasi Manual Dimulai",
                    description:
                      "Proses sinkronisasi data sedang berlangsung.",
                  });
                }}
                disabled={!syncEnabled}
                className="ml-auto"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Sinkronisasi Sekarang
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Backup</CardTitle>
              <CardDescription>
                Konfigurasi jadwal backup dan opsi penyimpanan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Aktifkan Backup Otomatis</h3>
                  <p className="text-sm text-muted-foreground">
                    Cadangkan data secara otomatis sesuai jadwal
                  </p>
                </div>
                <Switch
                  checked={backupEnabled}
                  onCheckedChange={setBackupEnabled}
                />
              </div>

              {backupEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="backup-schedule">Jadwal Backup</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="backup-schedule">
                        <SelectValue placeholder="Pilih jadwal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Setiap jam</SelectItem>
                        <SelectItem value="daily">Setiap hari</SelectItem>
                        <SelectItem value="weekly">Setiap minggu</SelectItem>
                        <SelectItem value="monthly">Setiap bulan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">
                      Periode Penyimpanan
                    </Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="backup-retention">
                        <SelectValue placeholder="Pilih periode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 hari</SelectItem>
                        <SelectItem value="14">14 hari</SelectItem>
                        <SelectItem value="30">30 hari</SelectItem>
                        <SelectItem value="90">90 hari</SelectItem>
                        <SelectItem value="365">365 hari</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-location">Lokasi Backup</Label>
                    <Select defaultValue="local">
                      <SelectTrigger id="backup-location">
                        <SelectValue placeholder="Pilih lokasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Server Lokal</SelectItem>
                        <SelectItem value="remote">Server Remote</SelectItem>
                        <SelectItem value="cloud">Cloud Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-md p-4 bg-muted/50">
                    <p className="text-sm">
                      Backup terakhir: 12 Mei 2025, 00:00 WIB
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: Berhasil (24.5 MB)
                    </p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  toast({
                    title: "Backup Manual Dimulai",
                    description: "Proses backup data sedang berlangsung.",
                  });
                }}
                disabled={!backupEnabled}
                className="ml-auto"
              >
                <Database className="mr-2 h-4 w-4" />
                Backup Sekarang
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Sumber Data</CardTitle>
              <CardDescription>
                Kelola sumber data yang digunakan dalam sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      Data Kementerian Dalam Negeri
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      https://api.kemendagri.go.id/v1
                    </p>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm">
                      Status: <span className="text-green-600">Aktif</span>
                    </p>
                    <p className="text-sm">
                      Tipe Data: Demografis, Administrasi Wilayah
                    </p>
                    <p className="text-sm">
                      Terakhir Disinkronkan: 12 Mei 2025, 08:00 WIB
                    </p>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      Badan Pusat Statistik
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      https://api.bps.go.id/statistik
                    </p>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm">
                      Status: <span className="text-green-600">Aktif</span>
                    </p>
                    <p className="text-sm">
                      Tipe Data: Statistik Kependudukan, Ekonomi
                    </p>
                    <p className="text-sm">
                      Terakhir Disinkronkan: 11 Mei 2025, 23:00 WIB
                    </p>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      BMKG
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      https://data.bmkg.go.id/api/public
                    </p>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm">
                      Status:{" "}
                      <span className="text-yellow-600">
                        Dibatasi (Rate Limited)
                      </span>
                    </p>
                    <p className="text-sm">
                      Tipe Data: Cuaca, Iklim, Gempa Bumi
                    </p>
                    <p className="text-sm">
                      Terakhir Disinkronkan: 10 Mei 2025, 12:30 WIB
                    </p>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      Dinas Sosial
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      https://dinsoskota.sukabumikota.go.id/api
                    </p>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm">
                      Status: <span className="text-red-600">Tidak Aktif</span>
                    </p>
                    <p className="text-sm">Tipe Data: Kesejahteraan Sosial</p>
                    <p className="text-sm">
                      Terakhir Disinkronkan: 2 Mei 2025, 09:15 WIB
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Sumber Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default DatabaseSettingsPage;
