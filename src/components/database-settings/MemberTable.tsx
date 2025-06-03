
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LocalStorageDB } from "@/utils/localStorage";

const MemberTable = () => {
  // Get anggota data from localStorage
  const anggotaData = LocalStorageDB.getAnggota();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Anggota</CardTitle>
        <CardDescription>
          Daftar anggota FKDM yang akan membuat laporan sesuai wilayah masing-masing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIK</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Kelurahan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {anggotaData.map((anggota) => (
              <TableRow key={anggota.id}>
                <TableCell className="font-mono text-sm">{anggota.nik}</TableCell>
                <TableCell className="font-medium">{anggota.nama}</TableCell>
                <TableCell>{anggota.jabatan}</TableCell>
                <TableCell>{anggota.kecamatan}</TableCell>
                <TableCell>{anggota.kelurahan}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Anggota
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {anggotaData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Tidak ada data anggota ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MemberTable;
