export interface LaporanData {
  id: string;
  tanggal: string;
  kecamatan: string;
  kelurahan: string;
  aspek_kehidupan: string;
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

export interface UserData {
  id: string;
  nama: string;
  jabatan: string;
  wilayah: string;
  pasfoto_url?: string;
}

export interface MemberSignature {
  nama: string;
  jabatan: string;
  wilayah: string;
  kecamatan: string;
  kelurahan: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (nik: string, nama: string) => Promise<boolean>;
  logout: () => void;
}

export interface KelurahanData {
  nama: string;
  kode: string;
}

export interface KecamatanData {
  nama: string;
  kode: string;
  kelurahan: KelurahanData[];
}

export const ASPEK_KEHIDUPAN = [
  'Politik',
  'Sosial', 
  'Budaya',
  'Keamanan',
  'Pendidikan',
  'Ekonomi',
  'Hukum',
  'Teknologi & Informasi',
  'Lingkungan Hidup',
  'Kesehatan',
  'Pertahanan & Siber',
  'Demografi & Kependudukan',
  'Transportasi & Infrastruktur',
  'Energi & SDA',
  'Agama & Kepercayaan',
  'Pertanian & Ketahanan Pangan',
  'Pariwisata',
  'Industri & Ketenagakerjaan',
  'Inovasi & Riset'
] as const;

export type AspekKehidupan = typeof ASPEK_KEHIDUPAN[number];
