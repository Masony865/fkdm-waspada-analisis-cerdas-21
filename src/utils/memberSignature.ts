
import { MemberSignature } from "@/types";

export const getMemberSignature = (): MemberSignature | null => {
  const loginData = localStorage.getItem('fkdm_anggota_login');
  if (!loginData) return null;

  const anggota = JSON.parse(loginData);
  const loginTime = new Date(anggota.loginTime);
  const now = new Date();
  const diffHours = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
  
  if (diffHours > 24) return null;

  return {
    nama: anggota.nama,
    jabatan: anggota.jabatan,
    wilayah: anggota.wilayah,
    kecamatan: anggota.kecamatan,
    kelurahan: anggota.kelurahan
  };
};

export const generateSignatureSection = (signature: MemberSignature): string => {
  return `

## Pembuat Laporan
- **Nama**: ${signature.nama}
- **Jabatan**: ${signature.jabatan}
- **Wilayah**: ${signature.kecamatan}, ${signature.kelurahan}
- **Tanggal**: ${new Date().toLocaleDateString('id-ID', {
  year: 'numeric',
  month: 'long', 
  day: 'numeric'
})}

---
*Laporan ini dibuat secara otomatis dengan tanda tangan digital FKDM*`;
};
