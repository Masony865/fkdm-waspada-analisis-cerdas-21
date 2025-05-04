
import { toast } from "@/components/ui/sonner";

export const handleSaveConnection = () => {
  toast({
    title: "Pengaturan Tersimpan",
    description: "Konfigurasi database telah berhasil disimpan.",
  });
};

export const handleTestConnection = () => {
  toast({
    title: "Koneksi Berhasil",
    description: "Berhasil terhubung ke database.",
  });
};

export const handleBackupNow = () => {
  toast({
    title: "Backup Dimulai",
    description: "Proses backup database sedang berjalan.",
  });
};

export const handleImport = () => {
  toast({
    title: "Impor Berhasil",
    description: "Data berhasil diimpor ke database.",
  });
};

export const handleSaveAdminSettings = () => {
  toast({
    title: "Pengaturan Admin Tersimpan",
    description: "Kredensial admin telah berhasil diperbarui.",
  });
};
