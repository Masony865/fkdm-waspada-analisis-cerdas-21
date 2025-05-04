
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle } from "lucide-react";

const SyncTab = () => {
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);

  return (
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
  );
};

export default SyncTab;
