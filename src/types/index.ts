
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
