
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, FileText, AlertTriangle, Calendar, User } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { WILAYAH_OPERASI, getKecamatanByNama } from "@/data/wilayahOperasi";
import { LocalStorageDB, LaporanData, AnggotaData } from "@/utils/localStorage";
import { useState, useEffect } from "react";

const DetailKecamatanPage = () => {
  const { kecamatan } = useParams<{ kecamatan: string }>();
  const [anggotaData, setAnggotaData] = useState<AnggotaData[]>([]);
  const [laporanData, setLaporanData] = useState<LaporanData[]>([]);

  const kecamatanData = getKecamatanByNama(
    kecamatan?.charAt(0).toUpperCase() + kecamatan?.slice(1) || ""
  );

  useEffect(() => {
    if (kecamatanData) {
      const anggota = LocalStorageDB.getAnggotaByWilayah(kecamatanData.nama);
      const laporan = LocalStorageDB.getLaporanByWilayah(kecamatanData.nama);
      setAnggotaData(anggota);
      setLaporanData(laporan);
    }
  }, [kecamatanData]);

  if (!kecamatanData) {
    return (
      <AppLayout title="Kecamatan Tidak Ditemukan">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Kecamatan Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-4">
            Kecamatan yang Anda cari tidak ada dalam sistem.
          </p>
          <Button asChild>
            <Link to="/wilayah-operasi">Kembali ke Wilayah Operasi</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Diproses': return 'bg-blue-100 text-blue-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTingkatBahayaColor = (tingkat: string) => {
    switch (tingkat) {
      case 'Rendah': return 'bg-green-100 text-green-800';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800';
      case 'Tinggi': return 'bg-orange-100 text-orange-800';
      case 'Sangat Tinggi': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout title={`Kecamatan ${kecamatanData.nama}`}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MapPin className="h-8 w-8 text-fkdm-red" />
              Kecamatan {kecamatanData.nama}
            </h1>
            <p className="text-muted-foreground">
              Kode: {kecamatanData.kode} • {kecamatanData.kelurahan.length} Kelurahan
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/wilayah-operasi">Kembali</Link>
            </Button>
            <Button asChild>
              <Link to={`/wilayah/${kecamatan}/login`}>Login Anggota</Link>
            </Button>
          </div>
        </div>

        {/* Statistik Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-fkdm-red" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Anggota</p>
                  <p className="text-2xl font-bold">{anggotaData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Laporan</p>
                  <p className="text-2xl font-bold">{laporanData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Laporan Aktif</p>
                  <p className="text-2xl font-bold">
                    {laporanData.filter(l => l.status !== 'Selesai').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Kelurahan</p>
                  <p className="text-2xl font-bold">{kecamatanData.kelurahan.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="kelurahan" className="space-y-4">
          <TabsList>
            <TabsTrigger value="kelurahan">Kelurahan</TabsTrigger>
            <TabsTrigger value="anggota">Anggota</TabsTrigger>
            <TabsTrigger value="laporan">Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="kelurahan" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {kecamatanData.kelurahan.map((kelurahan) => {
                const anggotaKelurahan = anggotaData.filter(a => a.kelurahan === kelurahan.nama);
                const laporanKelurahan = laporanData.filter(l => l.kelurahan === kelurahan.nama);
                
                return (
                  <Card key={kelurahan.kode} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{kelurahan.nama}</CardTitle>
                      <CardDescription>Kode: {kelurahan.kode}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Anggota:</span>
                          <Badge variant="secondary">{anggotaKelurahan.length}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Laporan:</span>
                          <Badge variant="secondary">{laporanKelurahan.length}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Aktif:</span>
                          <Badge variant="outline">
                            {laporanKelurahan.filter(l => l.status !== 'Selesai').length}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="anggota" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {anggotaData.map((anggota) => (
                <Card key={anggota.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={anggota.pasfoto_url || `https://i.pravatar.cc/150?img=${anggota.id}`}
                          alt={anggota.nama}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {anggota.nama}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {anggota.jabatan}
                        </p>
                        <p className="text-xs text-gray-400">
                          {anggota.kelurahan}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="laporan" className="space-y-4">
            <div className="space-y-4">
              {laporanData.map((laporan) => (
                <Card key={laporan.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{laporan.id}</Badge>
                          <Badge className={getStatusColor(laporan.status)}>
                            {laporan.status}
                          </Badge>
                          <Badge className={getTingkatBahayaColor(laporan.tingkat_bahaya)}>
                            {laporan.tingkat_bahaya}
                          </Badge>
                        </div>
                        <h3 className="font-medium">{laporan.jenis_kejadian}</h3>
                        <p className="text-sm text-muted-foreground">{laporan.deskripsi}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {laporan.tanggal}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {laporan.kelurahan}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {laporan.pelapor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DetailKecamatanPage;
