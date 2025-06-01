
import { UserData } from "@/types";
import { UserService } from "./userService";

// Data anggota demo untuk login (kept for backward compatibility)
const demoAnggotaData = [
  {
    id: 1,
    NIK: "3272062407740899",
    NAMA: "SYAFRIL SANI",
    JABATAN: "Ketua",
    WILAYAH: "Baros",
    PASFOTO: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    NIK: "3272061234567890",
    NAMA: "BUDI SANTOSO",
    JABATAN: "Sekretaris",
    WILAYAH: "Cikole",
    PASFOTO: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    NIK: "3272069876543210",
    NAMA: "SITI RAHAYU",
    JABATAN: "Bendahara",
    WILAYAH: "Gunungpuyuh",
    PASFOTO: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    NIK: "3272064567891234",
    NAMA: "AHMAD WIJAYA",
    JABATAN: "Anggota",
    WILAYAH: "Lembursitu",
    PASFOTO: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    NIK: "3272067890123456",
    NAMA: "DEWI SARTIKA",
    JABATAN: "Anggota",
    WILAYAH: "Warudoyong",
    PASFOTO: "https://i.pravatar.cc/150?img=5"
  }
];

export const checkCredentialsWithSupabase = async (nik: string, nama: string): Promise<UserData | null> => {
  try {
    console.log("Checking credentials for NIK:", nik, "and NAMA:", nama);
    
    // Check against new user database first
    const userFromDB = UserService.authenticateUser(nik, nama);
    if (userFromDB) {
      console.log("Found matching user in database:", userFromDB);
      return userFromDB;
    }
    
    // Fallback to demo data for backward compatibility
    const foundUser = demoAnggotaData.find(
      user => user.NIK === nik && user.NAMA === nama
    );
    
    if (foundUser) {
      console.log("Found matching user in demo data:", foundUser);
      return {
        id: String(foundUser.id),
        nama: foundUser.NAMA,
        jabatan: foundUser.JABATAN,
        wilayah: foundUser.WILAYAH,
        pasfoto_url: foundUser.PASFOTO
      };
    }
    
    console.log("No matching user found");
    return null;
  } catch (error) {
    console.error("Error checking credentials:", error);
    return null;
  }
};

export const checkAdminCredentials = (nik: string, nama: string): UserData | null => {
  if (nik.toLowerCase() === "admin" && nama === "admin123") {
    return {
      id: "admin",
      nama: "Admin FKDM",
      jabatan: "Administrator",
      wilayah: "Kota Sukabumi",
      pasfoto_url: "https://i.pravatar.cc/150?img=8"
    };
  }
  return null;
};

// Export data demo untuk keperluan lain
export const getDemoAnggotaData = () => demoAnggotaData;
