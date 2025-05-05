
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Eye, EyeOff } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNama, setShowNama] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use NIK as username and NAMA as password
      const success = await login(nik, nama);
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
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNamaVisibility = () => {
    setShowNama(!showNama);
  };

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
          <div className="space-y-2">
            <Label htmlFor="nik">NIK</Label>
            <Input
              id="nik"
              type="text"
              placeholder="Masukkan NIK Anda"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="nama">Nama</Label>
              <a
                href="#"
                className="text-sm text-primary hover:underline"
              >
                Lupa nama?
              </a>
            </div>
            <div className="relative">
              <Input
                id="nama"
                type={showNama ? "text" : "password"}
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleNamaVisibility}
              >
                {showNama ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Default login: NIK <strong>3203123456789010</strong>, Nama <strong>Budi Santoso</strong></p>
          </div>
          
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
