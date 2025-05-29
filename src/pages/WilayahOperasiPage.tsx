
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Users, FileText, Search } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { WILAYAH_OPERASI } from "@/data/wilayahOperasi";
import { LocalStorageDB } from "@/utils/localStorage";

const WilayahOperasiPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter kecamatan berdasarkan pencarian
  const filteredKecamatan = WILAYAH_OPERASI.filter(kecamatan =>
    kecamatan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kecamatan.kelurahan.some(kelurahan =>
      kelurahan.nama.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatistikKecamatan = (namaKecamatan: string) => {
    const anggota = LocalStorageDB.getAnggotaByWilayah(namaKecamatan);
    const laporan = LocalStorageDB.getLaporanByWilayah(namaKecamatan);
    return {
      jumlahAnggota: anggota.length,
      jumlahLaporan: laporan.length,
      laporanAktif: laporan.filter(l => l.status !== 'Selesai').length
    };
  };

  return (
    <AppLayout title="Wilayah Operasi">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Wilayah Operasi FKDM</h1>
            <p className="text-muted-foreground">
              Kota Sukabumi terdiri dari 7 kecamatan dengan total {WILAYAH_OPERASI.reduce((total, kec) => total + kec.kelurahan.length, 0)} kelurahan
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari kecamatan atau kelurahan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredKecamatan.map((kecamatan) => {
            const stats = getStatistikKecamatan(kecamatan.nama);
            
            return (
              <Card key={kecamatan.kode} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-fkdm-red" />
                        Kecamatan {kecamatan.nama}
                      </CardTitle>
                      <CardDescription>
                        Kode: {kecamatan.kode} • {kecamatan.kelurahan.length} Kelurahan
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{kecamatan.kelurahan.length}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-fkdm-red">{stats.jumlahAnggota}</div>
                      <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <Users className="h-3 w-3" />
                        Anggota
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{stats.jumlahLaporan}</div>
                      <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <FileText className="h-3 w-3" />
                        Laporan
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{stats.laporanAktif}</div>
                      <div className="text-xs text-muted-foreground">Aktif</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Kelurahan:</h4>
                    <div className="flex flex-wrap gap-1">
                      {kecamatan.kelurahan.map((kelurahan) => (
                        <Badge key={kelurahan.kode} variant="secondary" className="text-xs">
                          {kelurahan.nama}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1" size="sm">
                      <Link to={`/wilayah/${kecamatan.nama.toLowerCase()}`}>
                        Lihat Detail
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link to={`/wilayah/${kecamatan.nama.toLowerCase()}/login`}>
                        Login Anggota
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredKecamatan.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Tidak ditemukan kecamatan atau kelurahan yang sesuai dengan pencarian "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default WilayahOperasiPage;
