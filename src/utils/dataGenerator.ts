import { LaporanData, AnggotaData, ASPEK_KEHIDUPAN } from "@/types";
import { WILAYAH_OPERASI } from "@/data/wilayahOperasi";

const JENIS_KEJADIAN = [
  'Bencana Alam', 'Kebakaran', 'Kecelakaan Lalu Lintas', 'Gangguan Keamanan',
  'Banjir', 'Longsor', 'Kerusuhan', 'Pencurian', 'Vandalisme'
] as const;

const TINGKAT_BAHAYA: LaporanData['tingkat_bahaya'][] = ['Rendah', 'Sedang', 'Tinggi', 'Sangat Tinggi'];
const STATUS: LaporanData['status'][] = ['Pending', 'Diproses', 'Selesai'];

export const generateSampleData = (): { laporan: LaporanData[], anggota: AnggotaData[] } => {
  const laporan: LaporanData[] = [];
  const anggota: AnggotaData[] = [];

  let reportId = 1;

  WILAYAH_OPERASI.forEach(kec => {
    kec.kelurahan.forEach(kel => {
      // Generate 2-3 reports per kelurahan
      const reportCount = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < reportCount; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        const selectedAspek = ASPEK_KEHIDUPAN[Math.floor(Math.random() * ASPEK_KEHIDUPAN.length)];
        
        laporan.push({
          id: `LP${reportId.toString().padStart(4, '0')}`,
          tanggal: date.toISOString().split('T')[0],
          kecamatan: kec.nama,
          kelurahan: kel.nama,
          aspek_kehidupan: selectedAspek,
          deskripsi: `Laporan terkait ${selectedAspek} di ${kel.nama}, ${kec.nama}`,
          tingkat_bahaya: TINGKAT_BAHAYA[Math.floor(Math.random() * TINGKAT_BAHAYA.length)],
          status: STATUS[Math.floor(Math.random() * STATUS.length)],
          pelapor: `Anggota ${kec.nama} ${i + 1}`,
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
          nama: `Anggota ${kec.nama} ${kel.nama} ${i + 1}`,
          jabatan: i === 0 ? 'Koordinator Kelurahan' : 'Anggota',
          kecamatan: kec.nama,
          kelurahan: kel.nama,
          wilayah: `${kec.nama} - ${kel.nama}`,
          pasfoto_url: `https://i.pravatar.cc/150?img=${anggota.length + 10}`,
          created_at: new Date().toISOString()
        });
      }
    });
  });

  return { laporan, anggota };
};
