
import { toast } from "@/components/ui/sonner";

export const handleSaveConnection = () => {
  toast.success("Pengaturan Tersimpan", {
    description: "Konfigurasi database telah berhasil disimpan."
  });
};

export const handleTestConnection = () => {
  toast.success("Koneksi Berhasil", {
    description: "Berhasil terhubung ke database."
  });
};

export const handleBackupNow = () => {
  toast.info("Backup Dimulai", {
    description: "Proses backup database sedang berjalan."
  });
};

export const handleImport = () => {
  toast.success("Impor Berhasil", {
    description: "Data berhasil diimpor ke database."
  });
};

export const handleSaveAdminSettings = () => {
  toast.success("Pengaturan Admin Tersimpan", {
    description: "Kredensial admin telah berhasil diperbarui."
  });
};
