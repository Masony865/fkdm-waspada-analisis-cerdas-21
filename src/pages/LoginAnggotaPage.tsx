
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, MapPin, ArrowLeft } from "lucide-react";
import { getKecamatanByNama } from "@/data/wilayahOperasi";
import { LocalStorageDB } from "@/utils/localStorage";
import { Link } from "react-router-dom";

const LoginAnggotaPage = () => {
  const { kecamatan } = useParams<{ kecamatan: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNama, setShowNama] = useState(false);

  const kecamatanData = getKecamatanByNama(
    kecamatan?.charAt(0).toUpperCase() + kecamatan?.slice(1) || ""
  );

  if (!kecamatanData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 fkdm-pattern p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Kecamatan Tidak Ditemukan</CardTitle>
            <CardDescription>
              Halaman login untuk kecamatan yang diminta tidak tersedia.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/wilayah-operasi">Kembali ke Wilayah Operasi</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Cari anggota berdasarkan NIK, nama, dan wilayah
      const anggota = LocalStorageDB.getAnggotaByWilayah(kecamatanData.nama, kelurahan);
      const matchedAnggota = anggota.find(a => 
        a.nik === nik && 
        a.nama.toLowerCase() === nama.toLowerCase() &&
        a.kelurahan === kelurahan
      );

      if (matchedAnggota) {
        // Simpan data anggota yang login
        localStorage.setItem('fkdm_anggota_login', JSON.stringify({
          ...matchedAnggota,
          loginTime: new Date().toISOString()
        }));

        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${matchedAnggota.nama}!`,
        });

        // Redirect ke halaman input laporan
        navigate(`/wilayah/${kecamatan}/input-laporan`);
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "NIK, nama, atau kelurahan tidak sesuai dengan data anggota.",
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
        <div className="flex justify-center mb-8">
          <img
            src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png"
            alt="FKDM Logo"
            className="h-16 w-auto"
          />
        </div>
        
        <Card className="border border-fkdm-gold/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Button asChild variant="ghost" size="sm">
                <Link to={`/wilayah/${kecamatan}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-fkdm-red">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Kecamatan {kecamatanData.nama}</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Login Anggota FKDM
            </CardTitle>
            <CardDescription className="text-center">
              Masuk untuk membuat laporan kejadian
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kelurahan">Kelurahan</Label>
                <Select value={kelurahan} onValueChange={setKelurahan} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelurahan" />
                  </SelectTrigger>
                  <SelectContent>
                    {kecamatanData.kelurahan.map((kel) => (
                      <SelectItem key={kel.kode} value={kel.nama}>
                        {kel.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
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
              
              <Button
                type="submit"
                className="w-full bg-fkdm-red hover:bg-red-700"
                disabled={isLoading || !kelurahan}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-xs text-center text-muted-foreground">
              Hanya anggota terdaftar di {kecamatanData.nama} yang dapat mengakses halaman ini
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

export default LoginAnggotaPage;
