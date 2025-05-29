
import { LaporanData, AnggotaData } from "@/types";

const STORAGE_KEYS = {
  LAPORAN: 'fkdm_laporan_data',
  ANGGOTA: 'fkdm_anggota_data',
  BACKUP_TIMESTAMP: 'fkdm_backup_timestamp'
} as const;

export class LocalStorageService {
  static getLaporan(): LaporanData[] {
    const data = localStorage.getItem(STORAGE_KEYS.LAPORAN);
    return data ? JSON.parse(data) : [];
  }

  static saveLaporan(laporan: LaporanData[]): void {
    localStorage.setItem(STORAGE_KEYS.LAPORAN, JSON.stringify(laporan));
    this.updateBackupTimestamp();
  }

  static addLaporan(laporan: Omit<LaporanData, 'id' | 'created_at' | 'updated_at'>): LaporanData {
    const existing = this.getLaporan();
    const newId = `LP${(existing.length + 1).toString().padStart(4, '0')}`;
    const now = new Date().toISOString();
    
    const newLaporan: LaporanData = {
      ...laporan,
      id: newId,
      created_at: now,
      updated_at: now
    };

    existing.push(newLaporan);
    this.saveLaporan(existing);
    return newLaporan;
  }

  static getAnggota(): AnggotaData[] {
    const data = localStorage.getItem(STORAGE_KEYS.ANGGOTA);
    return data ? JSON.parse(data) : [];
  }

  static saveAnggota(anggota: AnggotaData[]): void {
    localStorage.setItem(STORAGE_KEYS.ANGGOTA, JSON.stringify(anggota));
    this.updateBackupTimestamp();
  }

  static getAnggotaByWilayah(kecamatan: string, kelurahan?: string): AnggotaData[] {
    const anggota = this.getAnggota();
    return anggota.filter(a => {
      if (kelurahan) {
        return a.kecamatan === kecamatan && a.kelurahan === kelurahan;
      }
      return a.kecamatan === kecamatan;
    });
  }

  static getLaporanByWilayah(kecamatan: string, kelurahan?: string): LaporanData[] {
    const laporan = this.getLaporan();
    return laporan.filter(l => {
      if (kelurahan) {
        return l.kecamatan === kecamatan && l.kelurahan === kelurahan;
      }
      return l.kecamatan === kecamatan;
    });
  }

  static updateBackupTimestamp(): void {
    localStorage.setItem(STORAGE_KEYS.BACKUP_TIMESTAMP, new Date().toISOString());
  }

  static getBackupTimestamp(): string | null {
    return localStorage.getItem(STORAGE_KEYS.BACKUP_TIMESTAMP);
  }

  static exportData() {
    return {
      laporan: this.getLaporan(),
      anggota: this.getAnggota(),
      backup_timestamp: this.getBackupTimestamp()
    };
  }

  static importData(data: { laporan: LaporanData[], anggota: AnggotaData[] }): void {
    this.saveLaporan(data.laporan);
    this.saveAnggota(data.anggota);
  }
}
