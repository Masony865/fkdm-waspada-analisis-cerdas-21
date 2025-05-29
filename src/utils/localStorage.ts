
export interface LaporanData {
  id: string;
  tanggal: string;
  kecamatan: string;
  kelurahan: string;
  jenis_kejadian: string;
  deskripsi: string;
  tingkat_bahaya: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  status: 'Pending' | 'Diproses' | 'Selesai';
  pelapor: string;
  koordinat?: {
    lat: number;
    lng: number;
  };
  gambar?: string[];
  created_at: string;
  updated_at: string;
}

export interface AnggotaData {
  id: string;
  nik: string;
  nama: string;
  jabatan: string;
  kecamatan: string;
  kelurahan: string;
  wilayah: string;
  pasfoto_url?: string;
  created_at: string;
}

const STORAGE_KEYS = {
  LAPORAN: 'fkdm_laporan_data',
  ANGGOTA: 'fkdm_anggota_data',
  BACKUP_TIMESTAMP: 'fkdm_backup_timestamp'
};

// Generate sample data
const generateSampleData = (): { laporan: LaporanData[], anggota: AnggotaData[] } => {
  const kecamatanData = [
    {
      kecamatan: 'Baros',
      kelurahan: ['Baros', 'Jayaraksa', 'Jayamekar', 'Sudajaya Hilir']
    },
    {
      kecamatan: 'Cibeureum', 
      kelurahan: ['Babakan', 'Cibeureumhilir', 'Limusnunggal', 'Sindangpalay']
    },
    {
      kecamatan: 'Cikole',
      kelurahan: ['Cikole', 'Cisarua', 'Gunungparang', 'Kebonjati', 'Selabatu', 'Subangjaya']
    },
    {
      kecamatan: 'Citamiang',
      kelurahan: ['Cikondang', 'Citamiang', 'Gedongpanjang', 'Nanggeleng', 'Tipar']
    },
    {
      kecamatan: 'Gunungpuyuh',
      kelurahan: ['Gunungpuyuh', 'Karamat', 'Karangtengah', 'Sriwidari']
    },
    {
      kecamatan: 'Lembursitu',
      kelurahan: ['Cikundul', 'Cipanengah', 'Lembursitu', 'Sindangsari', 'Situmekar']
    },
    {
      kecamatan: 'Warudoyong',
      kelurahan: ['Benteng', 'Dayeuhluhur', 'Nyomplong', 'Sukakarya', 'Warudoyong']
    }
  ];

  const jenisKejadian = [
    'Bencana Alam', 'Kebakaran', 'Kecelakaan Lalu Lintas', 'Gangguan Keamanan',
    'Banjir', 'Longsor', 'Kerusuhan', 'Pencurian', 'Vandalisme'
  ];

  const tingkatBahaya: LaporanData['tingkat_bahaya'][] = ['Rendah', 'Sedang', 'Tinggi', 'Sangat Tinggi'];
  const status: LaporanData['status'][] = ['Pending', 'Diproses', 'Selesai'];

  const laporan: LaporanData[] = [];
  const anggota: AnggotaData[] = [];

  // Generate sample reports
  let reportId = 1;
  kecamatanData.forEach(kec => {
    kec.kelurahan.forEach(kel => {
      // Generate 2-3 reports per kelurahan
      const reportCount = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < reportCount; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        laporan.push({
          id: `LP${reportId.toString().padStart(4, '0')}`,
          tanggal: date.toISOString().split('T')[0],
          kecamatan: kec.kecamatan,
          kelurahan: kel,
          jenis_kejadian: jenisKejadian[Math.floor(Math.random() * jenisKejadian.length)],
          deskripsi: `Laporan ${jenisKejadian[Math.floor(Math.random() * jenisKejadian.length)]} di ${kel}, ${kec.kecamatan}`,
          tingkat_bahaya: tingkatBahaya[Math.floor(Math.random() * tingkatBahaya.length)],
          status: status[Math.floor(Math.random() * status.length)],
          pelapor: `Anggota ${kec.kecamatan} ${i + 1}`,
          koordinat: {
            lat: -6.9 + (Math.random() * 0.1),
            lng: 106.9 + (Math.random() * 0.1)
          },
          created_at: date.toISOString(),
          updated_at: date.toISOString()
        });
        reportId++;
      }

      // Generate 1-2 members per kelurahan
      const memberCount = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < memberCount; i++) {
        anggota.push({
          id: `AGT${(anggota.length + 1).toString().padStart(4, '0')}`,
          nik: `327300${(Math.floor(Math.random() * 900000) + 100000)}`,
          nama: `Anggota ${kec.kecamatan} ${kel} ${i + 1}`,
          jabatan: i === 0 ? 'Koordinator Kelurahan' : 'Anggota',
          kecamatan: kec.kecamatan,
          kelurahan: kel,
          wilayah: `${kec.kecamatan} - ${kel}`,
          pasfoto_url: `https://i.pravatar.cc/150?img=${anggota.length + 10}`,
          created_at: new Date().toISOString()
        });
      }
    });
  });

  return { laporan, anggota };
};

export class LocalStorageDB {
  static initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.LAPORAN)) {
      const { laporan, anggota } = generateSampleData();
      this.saveLaporan(laporan);
      this.saveAnggota(anggota);
      this.updateBackupTimestamp();
    }
  }

  static getLaporan(): LaporanData[] {
    const data = localStorage.getItem(STORAGE_KEYS.LAPORAN);
    return data ? JSON.parse(data) : [];
  }

  static saveLaporan(laporan: LaporanData[]) {
    localStorage.setItem(STORAGE_KEYS.LAPORAN, JSON.stringify(laporan));
    this.updateBackupTimestamp();
  }

  static addLaporan(laporan: Omit<LaporanData, 'id' | 'created_at' | 'updated_at'>) {
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

  static saveAnggota(anggota: AnggotaData[]) {
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

  static updateBackupTimestamp() {
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

  static importData(data: { laporan: LaporanData[], anggota: AnggotaData[] }) {
    this.saveLaporan(data.laporan);
    this.saveAnggota(data.anggota);
  }
}
