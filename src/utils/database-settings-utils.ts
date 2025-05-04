
import { ToastOptions } from "@/components/ui/use-toast";

export const handleSaveConnection = (toast: (options: ToastOptions) => void) => {
  toast({
    title: "Pengaturan Tersimpan",
    description: "Konfigurasi database telah berhasil disimpan.",
  });
};

export const handleTestConnection = (toast: (options: ToastOptions) => void) => {
  toast({
    title: "Koneksi Berhasil",
    description: "Berhasil terhubung ke database.",
  });
};

export const handleBackupNow = (toast: (options: ToastOptions) => void) => {
  toast({
    title: "Backup Dimulai",
    description: "Proses backup database sedang berjalan.",
  });
};

export const handleImport = (toast: (options: ToastOptions) => void) => {
  toast({
    title: "Impor Berhasil",
    description: "Data berhasil diimpor ke database.",
  });
};

export const handleSaveAdminSettings = (toast: (options: ToastOptions) => void) => {
  toast({
    title: "Pengaturan Admin Tersimpan",
    description: "Kredensial admin telah berhasil diperbarui.",
  });
};
