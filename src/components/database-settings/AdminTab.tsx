
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserService } from "@/services/userService";
import { LocalStorageDB } from "@/utils/localStorage";

interface AdminTabProps {
  onSaveAdminSettings: () => void;
}

// Define form validation schema
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username harus minimal 3 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  password: z.string().min(6, {
    message: "Password harus minimal 6 karakter.",
  }),
  confirmPassword: z.string(),
  accessLevel: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok.",
  path: ["confirmPassword"],
});

const AdminTab = ({ onSaveAdminSettings }: AdminTabProps) => {
  const [formError, setFormError] = useState<string | null>(null);

  // Get admin users from database
  const allUsers = UserService.getAllUserData();
  const adminUsers = allUsers.filter(user => user.is_admin);

  // Get anggota data from localStorage
  const anggotaData = LocalStorageDB.getAnggota();

  // Define form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "admin",
      email: "",
      password: "",
      confirmPassword: "",
      accessLevel: "super",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormError(null);
    console.log(values);
    onSaveAdminSettings();
  };

  return (
    <div className="space-y-6">
      {/* Tabel Admin Database */}
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

      {/* Tabel Anggota Database */}
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

      {/* Form Pengaturan Admin */}
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Administrator</CardTitle>
          <CardDescription>
            Konfigurasikan akses dan kredensial administrator sistem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {formError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username Admin</FormLabel>
                    <FormControl>
                      <Input placeholder="Username admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Admin Baru</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Masukkan password baru" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Konfirmasi password baru" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level Akses</FormLabel>
                    <Select 
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih level akses" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="super">Super Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Admin</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="email@contoh.com" 
                        {...field} 
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Digunakan untuk pemulihan password dan notifikasi
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                  Simpan Pengaturan
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTab;
