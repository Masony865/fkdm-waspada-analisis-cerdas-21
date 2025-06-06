
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/App";
import { Eye, EyeOff, Database } from "lucide-react";
import { getDemoAnggotaData } from "@/services/authService";

const LoginPage = () => {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNama, setShowNama] = useState(false);
  const [showDemoData, setShowDemoData] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const demoData = getDemoAnggotaData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting login with NIK:", nik, "and NAMA:", nama);
      const success = await login(nik, nama);
      if (success) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        });
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

  const toggleNamaVisibility = () => {
    setShowNama(!showNama);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 fkdm-pattern p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-12">
          <img
            src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png"
            alt="FKDM Logo"
            className="h-16 w-auto mt-4"
          />
        </div>
        <Card className="border border-fkdm-gold/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              FKDM Waspada
            </CardTitle>
            <CardDescription className="text-center">
              Masuk untuk mengakses sistem analisis FKDM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="nama">Nama</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-sm text-primary hover:underline p-0 h-auto"
                    onClick={() => setShowDemoData(!showDemoData)}
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
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-center text-muted-foreground">
              Untuk informasi lebih lanjut, hubungi administrator FKDM Kota
              Sukabumi
            </p>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Forum Kewaspadaan Dini Masyarakat Kota Sukabumi
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
