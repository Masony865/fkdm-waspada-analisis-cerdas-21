
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

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
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

const App = () => {
  // Check if there's a stored auth state in localStorage
  const storedAuth = localStorage.getItem("fkdm_auth");
  const initialAuthState = storedAuth ? JSON.parse(storedAuth) : false;
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthState);

  // Update localStorage when authentication state changes
  useEffect(() => {
    localStorage.setItem("fkdm_auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    // Simple authentication for NIK and NAMA
    if (username === "3203123456789010" && password === "Budi Santoso") {
      setIsAuthenticated(true);
      return true;
    }
    // Legacy admin login
    if (username.toLowerCase() === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("fkdm_auth");
  };

  const authContext = {
    isAuthenticated,
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
