
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, MapPin, AlertTriangle, Send, LogOut } from "lucide-react";
import { getKecamatanByNama } from "@/data/wilayahOperasi";
import { LocalStorageDB, LaporanData } from "@/utils/localStorage";
import { Link } from "react-router-dom";

const InputLaporanPage = () => {
  const { kecamatan } = useParams<{ kecamatan: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [anggotaLogin, setAnggotaLogin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    jenis_kejadian: "",
    deskripsi: "",
    tingkat_bahaya: "" as LaporanData['tingkat_bahaya'] | "",
    koordinat_lat: "",
    koordinat_lng: ""
  });

  const kecamatanData = getKecamatanByNama(
    kecamatan?.charAt(0).toUpperCase() + kecamatan?.slice(1) || ""
  );

  const jenisKejadian = [
    'Bencana Alam',
    'Kebakaran', 
    'Kecelakaan Lalu Lintas',
    'Gangguan Keamanan',
    'Banjir',
    'Longsor',
    'Kerusuhan',
    'Pencurian',
    'Vandalisme',
    'Gangguan Listrik',
    'Gangguan Air Bersih',
    'Kecelakaan Kerja',
    'Lainnya'
  ];

  useEffect(() => {
    // Cek apakah anggota sudah login
    const loginData = localStorage.getItem('fkdm_anggota_login');
    if (loginData) {
      const anggota = JSON.parse(loginData);
      // Cek apakah login masih valid (dalam 24 jam)
      const loginTime = new Date(anggota.loginTime);
      const now = new Date();
      const diffHours = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      if (diffHours > 24) {
        // Login expired
        localStorage.removeItem('fkdm_anggota_login');
        navigate(`/wilayah/${kecamatan}/login`);
      } else {
        setAnggotaLogin(anggota);
      }
    } else {
      navigate(`/wilayah/${kecamatan}/login`);
    }
  }, [kecamatan, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const laporanBaru = {
        tanggal: formData.tanggal,
        kecamatan: anggotaLogin.kecamatan,
        kelurahan: anggotaLogin.kelurahan,
        jenis_kejadian: formData.jenis_kejadian,
        deskripsi: formData.deskripsi,
        tingkat_bahaya: formData.tingkat_bahaya as LaporanData['tingkat_bahaya'],
        status: 'Pending' as const,
        pelapor: anggotaLogin.nama,
        koordinat: formData.koordinat_lat && formData.koordinat_lng ? {
          lat: parseFloat(formData.koordinat_lat),
          lng: parseFloat(formData.koordinat_lng)
        } : undefined
      };

      const savedLaporan = LocalStorageDB.addLaporan(laporanBaru);

      toast({
        title: "Laporan Berhasil Dibuat",
        description: `Laporan ${savedLaporan.id} telah disimpan dan akan diproses.`,
      });

      // Reset form
      setFormData({
        tanggal: new Date().toISOString().split('T')[0],
        jenis_kejadian: "",
        deskripsi: "",
        tingkat_bahaya: "",
        koordinat_lat: "",
        koordinat_lng: ""
      });

    } catch (error) {
      console.error("Error saving laporan:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan laporan.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fkdm_anggota_login');
    navigate(`/wilayah/${kecamatan}/login`);
  };

  if (!anggotaLogin || !kecamatanData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30 fkdm-pattern p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png"
              alt="FKDM Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold">Input Laporan</h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {anggotaLogin.kelurahan}, {anggotaLogin.kecamatan}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>

        {/* Info Anggota */}
        <Card className="border-fkdm-gold/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={anggotaLogin.pasfoto_url || `https://i.pravatar.cc/150?img=${anggotaLogin.id}`}
                alt={anggotaLogin.nama}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{anggotaLogin.nama}</h3>
                <p className="text-sm text-muted-foreground">{anggotaLogin.jabatan}</p>
                <p className="text-xs text-muted-foreground">NIK: {anggotaLogin.nik}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Input Laporan */}
        <Card className="border border-fkdm-gold/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-fkdm-red" />
              Form Laporan Kejadian
            </CardTitle>
            <CardDescription>
              Isi form berikut untuk melaporkan kejadian di wilayah Anda
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal">Tanggal Kejadian</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenis_kejadian">Jenis Kejadian</Label>
                  <Select 
                    value={formData.jenis_kejadian} 
                    onValueChange={(value) => setFormData({...formData, jenis_kejadian: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kejadian" />
                    </SelectTrigger>
                    <SelectContent>
                      {jenisKejadian.map((jenis) => (
                        <SelectItem key={jenis} value={jenis}>
                          {jenis}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi Kejadian</Label>
                <Textarea
                  id="deskripsi"
                  placeholder="Jelaskan detail kejadian yang terjadi..."
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  required
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tingkat_bahaya">Tingkat Bahaya</Label>
                <Select 
                  value={formData.tingkat_bahaya} 
                  onValueChange={(value) => setFormData({...formData, tingkat_bahaya: value as LaporanData['tingkat_bahaya']})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tingkat bahaya" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rendah">Rendah</SelectItem>
                    <SelectItem value="Sedang">Sedang</SelectItem>
                    <SelectItem value="Tinggi">Tinggi</SelectItem>
                    <SelectItem value="Sangat Tinggi">Sangat Tinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="koordinat_lat">Latitude (Opsional)</Label>
                  <Input
                    id="koordinat_lat"
                    type="number"
                    step="any"
                    placeholder="-6.9175"
                    value={formData.koordinat_lat}
                    onChange={(e) => setFormData({...formData, koordinat_lat: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="koordinat_lng">Longitude (Opsional)</Label>
                  <Input
                    id="koordinat_lng"
                    type="number"
                    step="any"
                    placeholder="106.9275"
                    value={formData.koordinat_lng}
                    onChange={(e) => setFormData({...formData, koordinat_lng: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/wilayah/${kecamatan}`}>Kembali</Link>
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-fkdm-red hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Laporan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InputLaporanPage;
