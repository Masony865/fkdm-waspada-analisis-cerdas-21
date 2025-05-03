
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Search, Download, Filter } from "lucide-react";

// Dummy data for charts
const incidentData = [
  {
    tahun: 2021,
    bulan: "Jan",
    ancaman: 12,
    tantangan: 19,
    hambatan: 3,
    gangguan: 5,
  },
  {
    tahun: 2021,
    bulan: "Feb",
    ancaman: 15,
    tantangan: 11,
    hambatan: 4,
    gangguan: 6,
  },
  {
    tahun: 2021,
    bulan: "Mar",
    ancaman: 8,
    tantangan: 13,
    hambatan: 7,
    gangguan: 4,
  },
  {
    tahun: 2021,
    bulan: "Apr",
    ancaman: 10,
    tantangan: 17,
    hambatan: 6,
    gangguan: 3,
  },
  {
    tahun: 2021,
    bulan: "Mei",
    ancaman: 20,
    tantangan: 10,
    hambatan: 8,
    gangguan: 7,
  },
  {
    tahun: 2021,
    bulan: "Jun",
    ancaman: 17,
    tantangan: 22,
    hambatan: 5,
    gangguan: 4,
  },
];

const categoryData = [
  { name: "Politik", value: 35 },
  { name: "Ekonomi", value: 25 },
  { name: "Sosial Budaya", value: 20 },
  { name: "Keamanan", value: 15 },
  { name: "Lingkungan", value: 5 },
];

const COLORS = ["#E30613", "#D4AF37", "#009846", "#0088FE", "#FF8042"];

const locationData = [
  { name: "Cikole", value: 30 },
  { name: "Gunungpuyuh", value: 25 },
  { name: "Citamiang", value: 20 },
  { name: "Warudoyong", value: 15 },
  { name: "Baros", value: 10 },
];

const tableData = [
  {
    id: 1,
    tanggal: "12-05-2025",
    jenis: "Ancaman",
    kategori: "Politik",
    lokasi: "Kecamatan Cikole",
    deskripsi: "Potensi konflik terkait pemilihan ketua RT",
    status: "Dalam Pemantauan",
  },
  {
    id: 2,
    tanggal: "10-05-2025",
    jenis: "Gangguan",
    kategori: "Sosial Budaya",
    lokasi: "Kecamatan Citamiang",
    deskripsi: "Kebisingan kegiatan pada malam hari",
    status: "Ditangani",
  },
  {
    id: 3,
    tanggal: "08-05-2025",
    jenis: "Tantangan",
    kategori: "Ekonomi",
    lokasi: "Kecamatan Baros",
    deskripsi: "Kesulitan akses distribusi barang pascabanjir",
    status: "Selesai",
  },
  {
    id: 4,
    tanggal: "05-05-2025",
    jenis: "Hambatan",
    kategori: "Lingkungan",
    lokasi: "Kecamatan Warudoyong",
    deskripsi: "Peningkatan sampah di aliran sungai",
    status: "Ditangani",
  },
  {
    id: 5,
    tanggal: "01-05-2025",
    jenis: "Gangguan",
    kategori: "Keamanan",
    lokasi: "Kecamatan Gunungpuyuh",
    deskripsi: "Peningkatan laporan kehilangan sepeda motor",
    status: "Selesai",
  },
];

// AI-generated analysis for the data
const aiAnalysis = `
Berdasarkan data yang terkumpul, terdapat beberapa pola dan insight yang perlu diperhatikan:

1. Tren Ancaman dan Tantangan: Menunjukkan peningkatan signifikan sebesar 15% pada bulan Mei dibandingkan bulan April, terutama di kategori politik dan sosial budaya. Hal ini kemungkinan berkaitan dengan momentum menjelang kegiatan pemilihan RT/RW di beberapa kelurahan.

2. Distribusi Geografis: Kecamatan Cikole dan Gunungpuyuh memiliki intensitas kejadian tertinggi, masing-masing 30% dan 25% dari total laporan. Rekomendasi: tingkatkan koordinasi dengan petugas di wilayah tersebut.

3. Kategori Dominan: Isu politik dan ekonomi menjadi dominan dengan total 60% dari seluruh laporan. Perlu dilakukan monitoring khusus terhadap forum-forum diskusi masyarakat terkait kedua isu tersebut.

4. Prognosis: Berdasarkan pola historis, diperkirakan akan terjadi penurunan kasus pada bulan Juli mendatang, namun tetap perlu kewaspadaan tinggi di wilayah Cikole.

5. Rekomendasi Tindak Lanjut: Perlunya koordinasi lintas sektor, terutama dengan kepolisian dan tokoh masyarakat untuk antisipasi potensi konflik politik dan ekonomi.
`;

const DataAnalisisPage = () => {
  const [selectedTab, setSelectedTab] = useState("visualisasi");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = tableData.filter(
    (item) =>
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout title="Analisis Data">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Select defaultValue="bulan">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minggu">Minggu Ini</SelectItem>
                <SelectItem value="bulan">Bulan Ini</SelectItem>
                <SelectItem value="triwulan">Triwulan</SelectItem>
                <SelectItem value="semester">Semester</SelectItem>
                <SelectItem value="tahun">Tahunan</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="kota">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Wilayah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kota">Seluruh Kota</SelectItem>
                <SelectItem value="cikole">Kecamatan Cikole</SelectItem>
                <SelectItem value="gunungpuyuh">Kecamatan Gunungpuyuh</SelectItem>
                <SelectItem value="citamiang">Kecamatan Citamiang</SelectItem>
                <SelectItem value="warudoyong">Kecamatan Warudoyong</SelectItem>
                <SelectItem value="baros">Kecamatan Baros</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Ekspor Data
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="visualisasi"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="visualisasi">Visualisasi</TabsTrigger>
            <TabsTrigger value="tabel">Tabel Data</TabsTrigger>
            <TabsTrigger value="analisis">Analisis AI</TabsTrigger>
          </TabsList>

          <TabsContent value="visualisasi" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Tren ATHG (Ancaman, Tantangan, Hambatan, Gangguan)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={incidentData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bulan" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="ancaman"
                        name="Ancaman"
                        stroke="#E30613"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="tantangan"
                        name="Tantangan"
                        stroke="#D4AF37"
                      />
                      <Line
                        type="monotone"
                        dataKey="hambatan"
                        name="Hambatan"
                        stroke="#009846"
                      />
                      <Line
                        type="monotone"
                        dataKey="gangguan"
                        name="Gangguan"
                        stroke="#0088FE"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Distribusi per Kecamatan</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={locationData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Jumlah Kasus" fill="#E30613" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tabel">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle>Data Detail</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cari data..."
                      className="w-full pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                          Tanggal
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                          Jenis
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                          Kategori
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                          Lokasi
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                          Deskripsi
                        </th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3">{item.tanggal}</td>
                          <td className="px-4 py-3">{item.jenis}</td>
                          <td className="px-4 py-3">{item.kategori}</td>
                          <td className="px-4 py-3">{item.lokasi}</td>
                          <td className="px-4 py-3">{item.deskripsi}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === "Selesai"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "Ditangani"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredData.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      Tidak ada data yang sesuai dengan pencarian
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analisis">
            <Card>
              <CardHeader>
                <CardTitle>Analisis AI Berdasarkan Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-stone dark:prose-invert">
                  {aiAnalysis.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default DataAnalisisPage;
