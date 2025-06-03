
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserService } from "@/services/userService";

const AdminUserTable = () => {
  // Get admin users from database
  const allUsers = UserService.getAllUserData();
  const adminUsers = allUsers.filter(user => user.is_admin);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Admin</CardTitle>
        <CardDescription>
          Daftar administrator yang terdaftar dalam sistem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Password/NIK</TableHead>
              <TableHead>Wilayah</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.nama}</TableCell>
                <TableCell className="font-mono text-sm">{user.password}</TableCell>
                <TableCell>{user.wilayah}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Admin
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {adminUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Tidak ada data admin ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;
