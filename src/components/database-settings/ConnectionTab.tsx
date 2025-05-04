
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, FileText } from "lucide-react";

interface ConnectionTabProps {
  onSaveConnection: () => void;
  onTestConnection: () => void;
}

const ConnectionTab = ({ onSaveConnection, onTestConnection }: ConnectionTabProps) => {
  const [dbType, setDbType] = useState("mysql");
  const [connectionString, setConnectionString] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [database, setDatabase] = useState("");
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [excelFilePath, setExcelFilePath] = useState("");

  const renderDatabaseTypeFields = () => {
    switch(dbType) {
      case "spreadsheet":
        return (
          <div className="space-y-2">
            <Label htmlFor="spreadsheet-url">URL Google Spreadsheet</Label>
            <Input
              id="spreadsheet-url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={spreadsheetUrl}
              onChange={(e) => setSpreadsheetUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Pastikan Google Spreadsheet telah dibagikan dengan izin akses.
            </p>
          </div>
        );
      case "excel":
        return (
          <div className="space-y-2">
            <Label htmlFor="excel-path">File Excel</Label>
            <div className="flex gap-2">
              <Input
                id="excel-path"
                placeholder="Pilih file Excel"
                value={excelFilePath}
                onChange={(e) => setExcelFilePath(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">Browse</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Format yang didukung: .xlsx, .xls
            </p>
          </div>
        );
      case "sqlite":
        return (
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
        );
      default:
        return (
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
        );
    }
  };

  return (
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
              <SelectItem value="mysql" className="flex items-center gap-2">
                MySQL / MariaDB
              </SelectItem>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="sqlite">SQLite (Lokal)</SelectItem>
              <SelectItem value="mongodb">MongoDB</SelectItem>
              <SelectItem value="spreadsheet" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Google Spreadsheet
              </SelectItem>
              <SelectItem value="excel" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Microsoft Excel
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderDatabaseTypeFields()}

        <div className="flex space-x-2 pt-4">
          <Button onClick={onTestConnection}>Test Koneksi</Button>
          <Button variant="outline" onClick={onSaveConnection}>
            Simpan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionTab;
