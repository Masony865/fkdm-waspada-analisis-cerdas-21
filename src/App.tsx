
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DataAnalisisPage from "./pages/DataAnalisisPage";
import EditorPage from "./pages/EditorPage";
import DatabaseSettingsPage from "./pages/DatabaseSettingsPage";
import WilayahOperasiPage from "./pages/WilayahOperasiPage";
import DetailKecamatanPage from "./pages/DetailKecamatanPage";
import LoginAnggotaPage from "./pages/LoginAnggotaPage";
import InputLaporanPage from "./pages/InputLaporanPage";
import { supabase } from "./integrations/supabase/client";
import { LocalStorageDB } from "./utils/localStorage";

const queryClient = new QueryClient();

interface UserData {
  id: string;
  nama: string;
  jabatan: string;
  wilayah: string;
  pasfoto_url?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (nik: string, nama: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Function to check credentials against ANGGOTA FKDM table in Supabase
const checkCredentialsWithSupabase = async (nik: string, nama: string): Promise<UserData | null> => {
  try {
    console.log("Checking credentials for NIK:", nik, "and NAMA:", nama);
    
    // Query ANGGOTA FKDM table to find a matching member
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
    
    // Return user data from ANGGOTA FKDM table
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

const App = () => {
  // Check if there's a stored auth state in localStorage
  const storedAuth = localStorage.getItem("fkdm_auth");
  const initialAuthState = storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false, userData: null };
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
  const [userData, setUserData] = useState<UserData | null>(initialAuthState.userData);

  // Initialize localStorage database on app start
  useEffect(() => {
    LocalStorageDB.initializeData();
  }, []);

  // Update localStorage when authentication state changes
  useEffect(() => {
    localStorage.setItem("fkdm_auth", JSON.stringify({ isAuthenticated, userData }));
  }, [isAuthenticated, userData]);

  const login = async (nik: string, nama: string) => {
    // Check credentials against "ANGGOTA FKDM" table in Supabase
    const user = await checkCredentialsWithSupabase(nik, nama);
    
    if (user) {
      setIsAuthenticated(true);
      setUserData(user);
      return true;
    }
    
    // If no user found in ANGGOTA FKDM table, check for admin login
    if (nik.toLowerCase() === "admin" && nama === "admin123") {
      const adminUser = {
        id: "admin",
        nama: "Admin FKDM",
        jabatan: "Administrator",
        wilayah: "Kota Sukabumi",
        pasfoto_url: "https://i.pravatar.cc/150?img=8"
      };
      setIsAuthenticated(true);
      setUserData(adminUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("fkdm_auth");
  };

  const authContext = {
    isAuthenticated,
    userData,
    login,
    logout,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContext.Provider value={authContext}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/wilayah-operasi" element={<WilayahOperasiPage />} />
              <Route path="/wilayah/:kecamatan" element={<DetailKecamatanPage />} />
              <Route path="/wilayah/:kecamatan/login" element={<LoginAnggotaPage />} />
              <Route path="/wilayah/:kecamatan/input-laporan" element={<InputLaporanPage />} />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/analisis"
                element={
                  isAuthenticated ? (
                    <DataAnalisisPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/editor"
                element={
                  isAuthenticated ? (
                    <EditorPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/database-settings"
                element={
                  isAuthenticated ? (
                    <DatabaseSettingsPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
