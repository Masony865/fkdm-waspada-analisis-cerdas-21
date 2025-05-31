
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  GraduationCap, 
  Heart,
  Building,
  Banknote,
  Landmark,
  Smartphone,
  Leaf,
  Car,
  Zap,
  Church,
  Wheat,
  Camera,
  Lightbulb,
  Palette,
  Shield,
  Scale,
  Monitor
} from "lucide-react";

const AnalisisBarosPage = () => {
  const [selectedAspek, setSelectedAspek] = useState<string | null>(null);

  const aspekData = [
    {
      id: "demografi",
      title: "Demografi & Kependudukan",
      icon: Users,
      color: "bg-blue-500",
      trendData: {
        penduduk: { 2010: 29094, 2024: 40279, trend: "naik" },
        rumahTangga: { 2010: 7110, 2024: 13118, trend: "naik" },
        kepadatan: { status: "meningkat", tertinggi: "Kelurahan Baros (10.337 jiwa/km²)" }
      },
      athg: {
        ancaman: [
          "Beban lingkungan dan infrastruktur yang meningkat",
          "Potensi konflik sosial akibat persaingan sumber daya"
        ],
        tantangan: [
          "Penyediaan layanan dasar yang memadai",
          "Penataan ruang kota yang berkelanjutan"
        ],
        hambatan: [
          "Keterbatasan lahan untuk pengembangan infrastruktur",
          "Kapasitas infrastruktur tidak sebanding dengan pertumbuhan"
        ],
        gangguan: [
          "Ketidakseimbangan demografi di masa depan",
          "Gangguan mobilitas penduduk akibat bencana"
        ]
      }
    },
    {
      id: "pendidikan",
      title: "Pendidikan",
      icon: GraduationCap,
      color: "bg-green-500",
      trendData: {
        sekolah: { 2010: 10, 2024: 23, trend: "naik" },
        murid: { 2010: 3245, 2024: 8110, trend: "naik" },
        guru: { 2010: 138, 2024: 299, trend: "naik" }
      },
      athg: {
        ancaman: [
          "Kualitas pendidikan yang tidak merata",
          "Potensi putus sekolah bagi keluarga kurang mampu"
        ],
        tantangan: [
          "Peningkatan kualitas guru dan fasilitas",
          "Penyediaan jenjang menengah atas yang merata"
        ],
        hambatan: [
          "Keterbatasan anggaran untuk peningkatan sarana",
          "Kurangnya inovasi dalam metode pengajaran"
        ],
        gangguan: [
          "Kesenjangan akses pendidikan bagi kelompok rentan",
          "Dampak faktor eksternal (pandemi, bencana)"
        ]
      }
    },
    {
      id: "kesehatan",
      title: "Kesehatan",
      icon: Heart,
      color: "bg-red-500",
      trendData: {
        puskesmas: { jumlah: 1, rawatInap: "Ada" },
        rumahSakit: { jumlah: 0, status: "Tidak ada" },
        tenagaKesehatan: { jumlah: "25-41 orang", trend: "fluktuatif" }
      },
      athg: {
        ancaman: [
          "Wabah penyakit akibat sanitasi buruk",
          "Penyebaran penyakit menular yang cepat"
        ],
        tantangan: [
          "Peningkatan akses layanan kesehatan primer",
          "Penambahan fasilitas kesehatan yang lebih besar"
        ],
        hambatan: [
          "Keterbatasan anggaran daerah untuk investasi kesehatan",
          "Kurangnya tenaga medis spesialis"
        ],
        gangguan: [
          "Rendahnya kesadaran pola hidup sehat",
          "Munculnya penyakit tidak menular"
        ]
      }
    },
    {
      id: "ekonomi",
      title: "Ekonomi (Industri & Perdagangan)",
      icon: Building,
      color: "bg-yellow-500",
      trendData: {
        industri: { 2010: 11, 2019: 4, trend: "turun" },
        perdagangan: { 2012: "drastis turun", 2020: 156, trend: "pulih" },
        kategori: ["Pertokoan", "Minimarket/Swalayan", "Kelontong", "Warung/Kedai"]
      },
      athg: {
        ancaman: [
          "Persaingan usaha ketat dari luar daerah",
          "Dampak fluktuasi ekonomi makro"
        ],
        tantangan: [
          "Peningkatan daya saing produk lokal dan UMKM",
          "Pengembangan klaster industri inovatif"
        ],
        hambatan: [
          "Keterbatasan modal dan akses pasar bagi UMKM",
          "Regulasi yang kurang mendukung iklim investasi"
        ],
        gangguan: [
          "Praktik monopoli merugikan pelaku usaha kecil",
          "Munculnya bisnis ilegal atau tidak berizin"
        ]
      }
    }
  ];

  return (
    <AppLayout title="Analisis Data Kecamatan Baros (2010-2024)">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">
            Analisis Data Komparatif Kecamatan Baros
          </h1>
          <p className="text-lg opacity-90">
            Periode 2010-2024 | Berdasarkan Data BPS Kota Sukabumi
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 p-4 rounded">
              <div className="text-2xl font-bold">15 Tahun</div>
              <div className="text-sm">Periode Analisis</div>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <div className="text-2xl font-bold">19 Aspek</div>
              <div className="text-sm">Kehidupan Dianalisis</div>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <div className="text-2xl font-bold">4 Kelurahan</div>
              <div className="text-sm">Wilayah Coverage</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Ringkasan Eksekutif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Tren Positif</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Pertumbuhan penduduk yang konsisten (+38.4%)
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Peningkatan akses pendidikan yang signifikan
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Perkembangan sektor perdagangan dan koperasi
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Stabilitas struktur pemerintahan dan politik
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Area yang Memerlukan Perhatian</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Keterbatasan sarana kesehatan (tanpa RS)
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Fluktuasi sektor industri besar-sedang
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Kerentanan terhadap bencana alam
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Keterbatasan data untuk beberapa aspek
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aspek Kehidupan Analysis */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detail">Analisis Detail</TabsTrigger>
            <TabsTrigger value="athg">Analisis ATHG</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {aspekData.map((aspek) => (
                <Card key={aspek.id} className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedAspek(aspek.id)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded ${aspek.color} text-white`}>
                        <aspek.icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {aspek.id === selectedAspek ? "Dipilih" : "Lihat Detail"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{aspek.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {aspek.id === "demografi" && (
                        <div>
                          <div className="font-medium">Penduduk: 29,094 → 40,279</div>
                          <div>Pertumbuhan: +38.4%</div>
                        </div>
                      )}
                      {aspek.id === "pendidikan" && (
                        <div>
                          <div className="font-medium">Sekolah: 10 → 23 unit</div>
                          <div>Murid: 3,245 → 8,110 orang</div>
                        </div>
                      )}
                      {aspek.id === "kesehatan" && (
                        <div>
                          <div className="font-medium">Puskesmas: 1 unit</div>
                          <div className="text-red-600">RS: Belum ada</div>
                        </div>
                      )}
                      {aspek.id === "ekonomi" && (
                        <div>
                          <div className="font-medium">Industri: Fluktuatif</div>
                          <div>Perdagangan: Pulih 156 unit</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detail" className="space-y-4">
            {selectedAspek ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Analisis Detail: {aspekData.find(a => a.id === selectedAspek)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Detailed analysis content would go here */}
                    <p className="text-muted-foreground">
                      Pilih aspek kehidupan dari overview untuk melihat analisis detail.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Pilih aspek kehidupan dari tab Overview untuk melihat analisis detail.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="athg" className="space-y-4">
            {selectedAspek && aspekData.find(a => a.id === selectedAspek) ? (
              <div className="grid gap-4 md:grid-cols-2">
                {["ancaman", "tantangan", "hambatan", "gangguan"].map((kategori) => {
                  const aspek = aspekData.find(a => a.id === selectedAspek);
                  const items = aspek?.athg[kategori as keyof typeof aspek.athg] || [];
                  const colors = {
                    ancaman: "border-red-200 bg-red-50",
                    tantangan: "border-yellow-200 bg-yellow-50", 
                    hambatan: "border-orange-200 bg-orange-50",
                    gangguan: "border-purple-200 bg-purple-50"
                  };
                  
                  return (
                    <Card key={kategori} className={colors[kategori as keyof typeof colors]}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg capitalize">{kategori}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Pilih aspek kehidupan untuk melihat analisis Ancaman, Tantangan, Hambatan, dan Gangguan (ATHG).
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Rekomendasi Strategis</CardTitle>
            <CardDescription>
              Berdasarkan analisis komprehensif periode 2010-2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-700">Prioritas Jangka Pendek (1-2 tahun)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    Pembangunan atau peningkatan fasilitas kesehatan rujukan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    Sistem peringatan dini dan mitigasi bencana
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    Pemerataan jenjang pendidikan menengah atas
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">Prioritas Jangka Menengah (3-5 tahun)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    Pengembangan klaster industri dan UMKM
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    Penataan ruang dan infrastruktur berkelanjutan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    Program literasi digital dan keamanan siber
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-700">Prioritas Jangka Panjang (5-10 tahun)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    Ekosistem inovasi dan riset lokal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    Transisi energi terbarukan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    Pengembangan potensi pariwisata berkelanjutan
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AnalisisBarosPage;
