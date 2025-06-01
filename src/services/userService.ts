
import { UserData } from "@/types";

export interface UserLoginData {
  nama: string;
  password: string;
  wilayah: string;
  email: string;
  is_admin: boolean;
}

// Data pengguna dari SQL yang diberikan
const userData: UserLoginData[] = [
  { nama: 'MUHAMAD FARHAN WAHYUDI', password: '150505030500002', wilayah: 'Admin', email: 'muhamadfarhan@wahyudi.com', is_admin: true },
  { nama: 'TB. AFFAN DARMASUMITRA', password: '3272032509720001', wilayah: 'Kecamatan Citamiang', email: 'tb.affan@darmasumitra.com', is_admin: false },
  { nama: 'FIRMAN NURMANSYAH', password: '3272022806770001', wilayah: 'Kecamatan Gunungpuyuh', email: 'firman@nurmansyah.com', is_admin: false },
  { nama: 'SYAFRIL SANI', password: '3272062407740899', wilayah: 'Admin', email: 'syafril@sani.com', is_admin: true },
  { nama: 'ERWAN RUSWANDI', password: '3272011606700001', wilayah: 'Kecamatan Gunungpuyuh', email: 'erwan@ruswandi.com', is_admin: false },
  { nama: 'EKA ZULKARNAEN', password: '3202061808690001', wilayah: 'Kecamatan Cikole', email: 'eka@zulkarnaen.com', is_admin: false },
  { nama: 'PURNOMO SEPUTRO', password: '3272041301680001', wilayah: 'Kecamatan Gunungpuyuh', email: 'purnomo@seputro.com', is_admin: false },
  { nama: 'YUDI IRAWAN', password: '3272020901690001', wilayah: 'Kecamatan Cikole', email: 'yudi@irawan.com', is_admin: false },
  { nama: 'ASEP TK, ST.', password: '3272022312810002', wilayah: 'Kecamatan Cikole', email: 'asep@tk.com', is_admin: false },
  { nama: 'MUHAMMAD REAL WIJAYA', password: '3202320806000002', wilayah: 'Kecamatan Cikole', email: 'muhammad@realwijaya.com', is_admin: false },
  { nama: 'DODI MULYADI, SE', password: '3272013012630002', wilayah: 'Kecamatan Gunungpuyuh', email: 'dodi@mulyadi.com', is_admin: false },
  { nama: 'HENDRA RAMLAN', password: '3272031106830001', wilayah: 'Kecamatan Citamiang', email: 'hendra@ramlan.com', is_admin: false },
  { nama: 'RACHMAT SETIAWAN', password: '3272021910670901', wilayah: 'Kecamatan Lembursitu', email: 'rachmat@setiawan.com', is_admin: false },
  { nama: 'MOCH DINUL FAQIH', password: '3272070604980001', wilayah: 'Kecamatan Gunungpuyuh', email: 'moch@dinulfaqih.com', is_admin: false },
  { nama: 'DERIS SETIAWAN', password: '3272032611820001', wilayah: 'Kecamatan Citamiang', email: 'deris@setiawan.com', is_admin: false },
  { nama: 'DEDI TURMUDHI', password: '3272060406720002', wilayah: 'Kecamatan Gunungpuyuh', email: 'dedi@turmudhi.com', is_admin: false },
  { nama: 'ADE SULAEMAN', password: '3272070407630001', wilayah: 'Kecamatan Cibeureum', email: 'ade@sulaeman.com', is_admin: false },
  { nama: 'ARIS HERMAWAN, S.IP', password: '3272050402910001', wilayah: 'Kecamatan Baros', email: 'aris@hermawan.com', is_admin: false },
  { nama: 'DADANG SUJANA', password: '3272031208660001', wilayah: 'Kecamatan Cibeureum', email: 'dadang@sujana.com', is_admin: false },
  { nama: 'ENCEP SARIF HIDAYATTULLOH', password: '3272071606790002', wilayah: 'Kecamatan Cibeureum', email: 'encep@sarifhidayattulloh.com', is_admin: false },
  { nama: 'ENDANG JAMALUDIN', password: '3272031207660943', wilayah: 'Kecamatan Warudoyong', email: 'endang@jamaludin.com', is_admin: false },
  { nama: 'ENDIN SARIPUDIN', password: '3272041807680001', wilayah: 'Kecamatan Warudoyong', email: 'endin@saripudin.com', is_admin: false },
  { nama: 'IMAN HENDRAWAN', password: '3272041407700002', wilayah: 'Kecamatan Warudoyong', email: 'iman@hendrawan.com', is_admin: false },
  { nama: 'NENDA SAEPUROHMAN', password: '3272031906840899', wilayah: 'Admin', email: 'nenda@saepurohman.com', is_admin: true },
  { nama: 'RIDWAN IRAWAN', password: '3272031508660002', wilayah: 'Kecamatan Citamiang', email: 'ridwan@irawan.com', is_admin: false },
  { nama: 'TATAN SUTANDI', password: '3202221004900005', wilayah: 'Kecamatan Cibeureum', email: 'tatan@sutandi.com', is_admin: false },
  { nama: 'DERIAN DWI RAMDHAN', password: '3272051103950003', wilayah: 'Kecamatan Baros', email: 'derian@dwiramdhan.com', is_admin: false },
  { nama: 'SUMARDIN LESTALLUHU', password: '3272022104760001', wilayah: 'Kecamatan Lembursitu', email: 'sumardin@lestalluhu.com', is_admin: false },
  { nama: 'ERWAN KABUL', password: '3272032708680021', wilayah: 'Kecamatan Citamiang', email: 'erwan@kabul.com', is_admin: false },
  { nama: 'RUSLAN HADI', password: '3272041703860002', wilayah: 'Kecamatan Warudoyong', email: 'ruslan@hadi.com', is_admin: false },
  { nama: 'TUBAGUS WAHYUDIN', password: '3272041010730041', wilayah: 'Kecamatan Warudoyong', email: 'tubagus@wahyudin.com', is_admin: false },
  { nama: 'MUHAMMAD DINAR SUBAGJA', password: '3202322211970004', wilayah: 'Admin', email: 'muhammad@dinarsubagja.com', is_admin: true },
  { nama: 'TUTANG SURAHMAN', password: '3272051711700021', wilayah: 'Kecamatan Baros', email: 'tutang@surahman.com', is_admin: false },
  { nama: 'IWAN RIDWAN TAUFIK', password: '3272052801770001', wilayah: 'Kecamatan Baros', email: 'iwan@ridwantaufik.com', is_admin: false },
  { nama: 'ILHAM GINANZAR', password: '3272031305930001', wilayah: 'Kecamatan Cibeureum', email: 'ilham@ginanzar.com', is_admin: false },
  { nama: 'DIDI JUNAEDI', password: '3272020111650901', wilayah: 'Kecamatan Cikole', email: 'didi@junaedi.com', is_admin: false },
  { nama: 'NUSI SANUSI', password: '3272050505760901', wilayah: 'Admin', email: 'nusi@sanusi.com', is_admin: true },
  { nama: 'INDRA SUNDAWAN, S.Pd.', password: '3272051811810001', wilayah: 'Admin', email: 'indra@sundawan.com', is_admin: true }
];

const STORAGE_KEY = 'fkdm_users_data';

export class UserService {
  static initializeUserData(): void {
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.saveUsers(userData);
    }
  }

  static getUsers(): UserLoginData[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : userData;
  }

  static saveUsers(users: UserLoginData[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  static authenticateUser(nik: string, nama: string): UserData | null {
    const users = this.getUsers();
    
    // Cari user berdasarkan password (NIK) dan nama
    const foundUser = users.find(
      user => user.password === nik && user.nama.toUpperCase() === nama.toUpperCase()
    );
    
    if (foundUser) {
      return {
        id: foundUser.password, // Menggunakan password sebagai ID
        nama: foundUser.nama,
        jabatan: foundUser.is_admin ? 'Administrator' : 'Anggota',
        wilayah: foundUser.wilayah,
        pasfoto_url: `https://i.pravatar.cc/150?u=${foundUser.email}`
      };
    }
    
    return null;
  }

  static getAllUserData(): UserLoginData[] {
    return this.getUsers();
  }
}
