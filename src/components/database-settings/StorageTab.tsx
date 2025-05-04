
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StorageTabProps {
  onImport: () => void;
}

const StorageTab = ({ onImport }: StorageTabProps) => {
  return (
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
            <Button variant="outline" onClick={onImport}>
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
  );
};

export default StorageTab;
