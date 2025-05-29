
import { supabase } from "@/integrations/supabase/client";
import { UserData } from "@/types";

export const checkCredentialsWithSupabase = async (nik: string, nama: string): Promise<UserData | null> => {
  try {
    console.log("Checking credentials for NIK:", nik, "and NAMA:", nama);
    
    const { data, error } = await supabase
      .from("ANGGOTA FKDM")
      .select("id, NIK, NAMA, JABATAN, WILAYAH, PASFOTO")
      .eq("NIK", nik)
      .eq("NAMA", nama)
      .maybeSingle();
    
    if (error) {
      console.error("Supabase query error:", error);
      return null;
    }
    
    if (!data) {
      console.log("No matching FKDM member found");
      return null;
    }

    console.log("Found matching FKDM member:", data);
    
    return {
      id: String(data.id),
      nama: data.NAMA || "",
      jabatan: data.JABATAN || "",
      wilayah: data.WILAYAH || "",
      pasfoto_url: data.PASFOTO || ""
    };
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
