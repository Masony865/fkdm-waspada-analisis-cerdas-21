
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy data for demonstration
const monthlyIncidentData = [
  { month: "Jan", incidents: 65 },
  { month: "Feb", incidents: 59 },
  { month: "Mar", incidents: 80 },
  { month: "Apr", incidents: 81 },
  { month: "Mei", incidents: 56 },
  { month: "Jun", incidents: 55 },
  { month: "Jul", incidents: 40 },
];

const incidentTypeData = [
  { name: "Ketertiban", value: 35 },
  { name: "Politik", value: 20 },
  { name: "Sosial", value: 25 },
  { name: "Ekonomi", value: 15 },
  { name: "Lainnya", value: 5 },
];

const COLORS = ["#E30613", "#FFC658", "#D4AF37", "#009846", "#8884d8"];

const regionalData = [
  { name: "Cikole", incidents: 45, resolved: 40 },
  { name: "Gunungpuyuh", incidents: 30, resolved: 28 },
  { name: "Citamiang", incidents: 35, resolved: 30 },
  { name: "Warudoyong", incidents: 25, resolved: 20 },
  { name: "Baros", incidents: 20, resolved: 18 },
  { name: "Cibeureum", incidents: 15, resolved: 12 },
  { name: "Lembursitu", incidents: 10, resolved: 8 },
];

const currentThreatLevel = 2; // 0-4 scale

const threatLevels = [
  { label: "Aman", color: "bg-green-500" },
  { label: "Waspada", color: "bg-yellow-500" },
  { label: "Siaga", color: "bg-orange-500" },
  { label: "Awas", color: "bg-red-500" },
  { label: "Kritis", color: "bg-purple-500" },
];

const recentReports = [
  {
    id: 1,
    title: "Potensi Konflik Sosial di Pasar Pelita",
    location: "Kecamatan Cikole",
    severity: "Sedang",
    date: "12 Mei 2025",
    status: "Dalam Pemantauan",
  },
  {
    id: 2,
    title: "Gangguan Ketersediaan Air Bersih",
    location: "Kecamatan Citamiang",
    severity: "Tinggi",
    date: "10 Mei 2025",
    status: "Ditangani",
  },
  {
    id: 3,
    title: "Unjuk Rasa Pedagang Kaki Lima",
    location: "Alun-alun Kota",
    severity: "Rendah",
    date: "08 Mei 2025",
    status: "Selesai",
  },
  {
    id: 4,
    title: "Kemacetan Parah di Jalan Utama",
    location: "Kecamatan Gunungpuyuh",
    severity: "Rendah",
    date: "05 Mei 2025",
    status: "Ditangani",
  },
];

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-l-4 border-l-fkdm-red">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Laporan Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">217</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 12%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-fkdm-gold">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Status Penanganan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground mt-1">
              187 dari 217 laporan telah ditindaklanjuti
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-fkdm-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Level Ancaman
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {threatLevels.map((level, index) => (
                <div
                  key={index}
                  className={`h-8 flex-1 rounded-sm ${level.color} ${
                    index <= currentThreatLevel
                      ? "opacity-100"
                      : "opacity-20"
                  }`}
                  title={level.label}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-semibold">
              Status: {threatLevels[currentThreatLevel].label}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Tren Laporan Insiden</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={monthlyIncidentData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke="#E30613"
                  fill="#E30613"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Distribusi Jenis Insiden</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incidentTypeData}
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
                  {incidentTypeData.map((entry, index) => (
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

      <div className="mt-6">
        <Tabs defaultValue="reports">
          <TabsList>
            <TabsTrigger value="reports">Laporan Terbaru</TabsTrigger>
            <TabsTrigger value="regional">Data Regional</TabsTrigger>
          </TabsList>
          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left text-sm font-medium text-muted-foreground py-3">
                          Judul
                        </th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3">
                          Lokasi
                        </th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3">
                          Tingkat
                        </th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3">
                          Tanggal
                        </th>
                        <th className="text-left text-sm font-medium text-muted-foreground py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.map((report) => (
                        <tr
                          key={report.id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="py-3">{report.title}</td>
                          <td className="py-3">{report.location}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                report.severity === "Tinggi"
                                  ? "bg-red-100 text-red-800"
                                  : report.severity === "Sedang"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {report.severity}
                            </span>
                          </td>
                          <td className="py-3">{report.date}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                report.status === "Selesai"
                                  ? "bg-green-100 text-green-800"
                                  : report.status === "Ditangani"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="regional" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Kecamatan</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    width={500}
                    height={300}
                    data={regionalData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="incidents" name="Total Insiden" fill="#E30613" />
                    <Bar
                      dataKey="resolved"
                      name="Insiden Tertangani"
                      fill="#009846"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
