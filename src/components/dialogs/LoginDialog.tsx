
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Database } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/App";
import { getDemoAnggotaData } from "@/services/authService";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const [formData, setFormData] = useState({
    nama: "",
    nik: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNama, setShowNama] = useState(false);
  const [showDemoData, setShowDemoData] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const demoData = getDemoAnggotaData();

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting login with NIK:", formData.nik, "and NAMA:", formData.nama);
      const success = await login(formData.nik, formData.nama);
      
      if (success) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        });
        onOpenChange(false);
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "NIK atau Nama tidak sesuai data anggota.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNamaVisibility = () => setShowNama(!showNama);
  const toggleDemoData = () => setShowDemoData(!showDemoData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">FKDM Waspada</DialogTitle>
          <DialogDescription className="text-center">
            Masuk untuk mengakses sistem analisis FKDM
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center mb-4">
          <img
            src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png"
            alt="FKDM Logo"
            className="h-16 w-auto mt-2"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="nama">Nama</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-sm text-primary hover:underline p-0 h-auto"
                onClick={toggleDemoData}
              >
                <Database className="h-3 w-3 mr-1" />
                {showDemoData ? "Sembunyikan" : "Lihat Data"}
              </Button>
            </div>
            <div className="relative">
              <Input
                id="nama"
                type={showNama ? "text" : "password"}
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={handleInputChange("nama")}
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleNamaVisibility}
                aria-label={showNama ? "Hide name" : "Show name"}
              >
                {showNama ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* NIK Field */}
          <div className="space-y-2">
            <Label htmlFor="nik">NIK</Label>
            <Input
              id="nik"
              type="text"
              placeholder="Masukkan NIK Anda"
              value={formData.nik}
              onChange={handleInputChange("nik")}
              required
            />
          </div>
          
          {/* Demo Data Display */}
          {showDemoData && (
            <div className="bg-blue-50 p-4 rounded-lg max-h-40 overflow-y-auto">
              <h4 className="font-semibold text-blue-900 mb-2">Data Anggota:</h4>
              <div className="space-y-2 text-sm">
                {demoData.map((anggota) => (
                  <div key={anggota.id} className="border-b border-blue-200 pb-1">
                    <div className="text-blue-700">Nama: {anggota.NAMA}</div>
                    <div className="font-mono text-blue-800">NIK: {anggota.NIK}</div>
                  </div>
                ))}
                <div className="border-b border-blue-200 pb-1">
                  <div className="text-blue-700">Nama: admin123</div>
                  <div className="font-mono text-blue-800">NIK: admin</div>
                </div>
              </div>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full bg-fkdm-red hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
