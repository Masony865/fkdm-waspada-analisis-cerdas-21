
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminTabProps {
  onSaveAdminSettings: () => void;
}

const AdminTab = ({ onSaveAdminSettings }: AdminTabProps) => {
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Administrator</CardTitle>
        <CardDescription>
          Konfigurasikan akses dan kredensial administrator sistem.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-username">Username Admin</Label>
          <Input
            id="admin-username"
            placeholder="Username admin"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password">Password Admin Baru</Label>
          <Input
            id="admin-password"
            type="password"
            placeholder="Masukkan password baru"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password-confirm">Konfirmasi Password</Label>
          <Input
            id="admin-password-confirm"
            type="password"
            placeholder="Konfirmasi password baru"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-level">Level Akses</Label>
          <Select defaultValue="super">
            <SelectTrigger id="admin-level">
              <SelectValue placeholder="Pilih level akses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="super">Super Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-email">Email Admin</Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="email@contoh.com"
          />
          <p className="text-sm text-muted-foreground">
            Digunakan untuk pemulihan password dan notifikasi
          </p>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button onClick={onSaveAdminSettings}>Simpan Pengaturan</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTab;
