
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

const queryClient = new QueryClient();

interface UserData {
  id: string;
  nama: string;
  jabatan: string;
  wilayah: string;
  pasfoto_convert?: string;
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

// Mock function to simulate Supabase authentication
// In a real implementation, this would be replaced with actual Supabase calls
const checkCredentialsWithSupabase = async (nik: string, nama: string): Promise<UserData | null> => {
  // Simple authentication for NIK and NAMA
  if (nik === "3203123456789010" && nama === "Budi Santoso") {
    return {
      id: "1",
      nama: "Budi Santoso",
      jabatan: "Ketua FKDM",
      wilayah: "Kecamatan Cikole",
      pasfoto_convert: "https://i.pravatar.cc/150?img=3"
    };
  }
  // Legacy admin login
  if (nik.toLowerCase() === "admin" && nama === "admin123") {
    return {
      id: "admin",
      nama: "Admin FKDM",
      jabatan: "Administrator",
      wilayah: "Kota Sukabumi",
      pasfoto_convert: "https://i.pravatar.cc/150?img=8"
    };
  }
  return null;
};

const App = () => {
  // Check if there's a stored auth state in localStorage
  const storedAuth = localStorage.getItem("fkdm_auth");
  const initialAuthState = storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false, userData: null };
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
  const [userData, setUserData] = useState<UserData | null>(initialAuthState.userData);

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
