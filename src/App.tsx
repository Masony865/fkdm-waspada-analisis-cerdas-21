
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { AuthContextType, UserData } from "@/types";
import { checkCredentialsWithSupabase, checkAdminCredentials } from "@/services/authService";
import { LocalStorageDB } from "@/utils/localStorage";
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

const queryClient = new QueryClient();

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const App = () => {
  const storedAuth = localStorage.getItem("fkdm_auth");
  const initialAuthState = storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false, userData: null };
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState.isAuthenticated);
  const [userData, setUserData] = useState<UserData | null>(initialAuthState.userData);

  useEffect(() => {
    LocalStorageDB.initializeData();
  }, []);

  useEffect(() => {
    localStorage.setItem("fkdm_auth", JSON.stringify({ isAuthenticated, userData }));
  }, [isAuthenticated, userData]);

  const login = async (nik: string, nama: string): Promise<boolean> => {
    // Check credentials against Supabase
    const user = await checkCredentialsWithSupabase(nik, nama);
    
    if (user) {
      setIsAuthenticated(true);
      setUserData(user);
      return true;
    }
    
    // Check admin credentials
    const adminUser = checkAdminCredentials(nik, nama);
    if (adminUser) {
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

  const authContext: AuthContextType = {
    isAuthenticated,
    userData,
    login,
    logout,
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
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
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/analisis" element={<ProtectedRoute><DataAnalisisPage /></ProtectedRoute>} />
              <Route path="/editor" element={<ProtectedRoute><EditorPage /></ProtectedRoute>} />
              <Route path="/database-settings" element={<ProtectedRoute><DatabaseSettingsPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
