
import { LocalStorageService } from "@/services/localStorageService";
import { MemberPhotoService } from "@/services/memberPhotoService";
import { generateSampleData } from "@/utils/dataGenerator";

export class LocalStorageDB {
  static initializeData(): void {
    if (!localStorage.getItem('fkdm_laporan_data')) {
      const { laporan, anggota } = generateSampleData();
      LocalStorageService.saveLaporan(laporan);
      LocalStorageService.saveAnggota(anggota);
    }
    
    // Initialize member photo data
    MemberPhotoService.initializeMemberData();
  }

  // Re-export all methods from LocalStorageService for backward compatibility
  static getLaporan = LocalStorageService.getLaporan;
  static saveLaporan = LocalStorageService.saveLaporan;
  static addLaporan = LocalStorageService.addLaporan;
  static getAnggota = LocalStorageService.getAnggota;
  static saveAnggota = LocalStorageService.saveAnggota;
  static getAnggotaByWilayah = LocalStorageService.getAnggotaByWilayah;
  static getLaporanByWilayah = LocalStorageService.getLaporanByWilayah;
  static updateBackupTimestamp = LocalStorageService.updateBackupTimestamp;
  static getBackupTimestamp = LocalStorageService.getBackupTimestamp;
  static exportData = LocalStorageService.exportData;
  static importData = LocalStorageService.importData;
}

// Re-export types for backward compatibility
export type { LaporanData, AnggotaData } from "@/types";
