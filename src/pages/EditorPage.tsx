
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Save,
  Upload,
  Download,
  FileText,
  Image,
  Plus,
  Table,
  Trash2,
  Search,
} from "lucide-react";

// Sample template data
const templates = [
  {
    id: "template1",
    name: "Laporan Harian",
    category: "Rutin",
    description:
      "Template untuk laporan harian aktivitas dan status ATHG di wilayah pemantauan",
    content: `# Laporan Harian FKDM Kota Sukabumi

## Informasi Umum
- Tanggal: [Tanggal]
- Petugas: [Nama Petugas]
- Wilayah: [Wilayah]

## Ringkasan Situasi
[Isi dengan ringkasan situasi umum wilayah pemantauan]

## Deteksi ATHG
### Ancaman
- [Isi dengan daftar ancaman yang terdeteksi]

### Tantangan
- [Isi dengan daftar tantangan yang dihadapi]

### Hambatan
- [Isi dengan daftar hambatan yang ditemukan]

### Gangguan
- [Isi dengan daftar gangguan yang terjadi]

## Analisis
[Isi dengan analisis singkat berdasarkan temuan]

## Rekomendasi
[Isi dengan rekomendasi tindak lanjut]

## Dokumentasi
[Lampirkan dokumentasi terkait]`,
  },
  {
    id: "template2",
    name: "Laporan Insiden",
    category: "Insidentil",
    description: "Template untuk melaporkan insiden khusus yang memerlukan perhatian",
    content: `# Laporan Insiden FKDM Kota Sukabumi

## Informasi Insiden
- Tanggal & Waktu: [Tanggal dan Waktu Insiden]
- Lokasi: [Lokasi Detail]
- Kategori: [Kategori Insiden]
- Pelapor: [Nama Pelapor]

## Deskripsi Insiden
[Isi dengan deskripsi detail insiden yang terjadi]

## Dampak
[Jelaskan dampak insiden terhadap masyarakat atau keamanan]

## Tindakan yang Sudah Diambil
[Isi dengan tindakan yang sudah dilakukan]

## Rekomendasi Tindak Lanjut
[Isi dengan rekomendasi penanganan lebih lanjut]

## Lampiran
[Tambahkan dokumentasi atau bukti terkait insiden]`,
  },
  {
    id: "template3",
    name: "Analisis Situasi Wilayah",
    category: "Analisis",
    description: "Template untuk analisis mendalam situasi keamanan dan ketertiban di wilayah",
    content: `# Analisis Situasi Wilayah

## Informasi Umum
- Periode Analisis: [Periode]
- Wilayah: [Wilayah yang Dianalisis]
- Tim Analis: [Nama Tim/Analis]

## Metodologi
[Jelaskan metode pengumpulan dan analisis data]

## Temuan Utama
[Isi dengan temuan-temuan utama dari analisis]

### Aspek Politik
[Analisis aspek politik]

### Aspek Ekonomi
[Analisis aspek ekonomi]

### Aspek Sosial Budaya
[Analisis aspek sosial budaya]

### Aspek Keamanan
[Analisis aspek keamanan]

## Tren dan Pola
[Identifikasi tren dan pola yang terdeteksi]

## Proyeksi dan Skenario
[Sampaikan proyeksi situasi dan kemungkinan skenario]

## Rekomendasi
[Berikan rekomendasi berdasarkan analisis]

## Lampiran dan Data Pendukung
[Sertakan data pendukung untuk analisis]`,
  },
];

// Sample saved document data
const savedDocuments = [
  {
    id: "doc1",
    title: "Laporan Harian 12 Mei 2025",
    template: "Laporan Harian",
    lastModified: "12 Mei 2025, 14:30",
    author: "Ahmad Sudirman",
  },
  {
    id: "doc2",
    title: "Analisis Situasi Kecamatan Cikole",
    template: "Analisis Situasi Wilayah",
    lastModified: "10 Mei 2025, 09:45",
    author: "Budi Santoso",
  },
  {
    id: "doc3",
    title: "Laporan Insiden Pasar Pelita",
    template: "Laporan Insiden",
    lastModified: "08 Mei 2025, 16:20",
    author: "Citra Dewi",
  },
];

const EditorPage = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter documents based on search
  const filteredDocuments = savedDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setDocumentContent(template.content);
      setDocumentTitle(`Baru: ${template.name}`);
    }
  };

  const handleSaveDocument = () => {
    if (!documentTitle.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Judul dokumen tidak boleh kosong",
      });
      return;
    }

    // Normally, this would save to a database
    toast({
      title: "Dokumen Tersimpan",
      description: `"${documentTitle}" telah berhasil disimpan`,
    });
  };

  const formatText = (format: string) => {
    // This would normally implement formatting in a real editor
    toast({
      title: "Format Teks",
      description: `Teks diformat dengan: ${format}`,
    });
  };

  return (
    <AppLayout title="Editor Laporan">
      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Editor Laporan</TabsTrigger>
          <TabsTrigger value="saved">Dokumen Tersimpan</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Editor Laporan</CardTitle>
                    <CardDescription>
                      Buat dan edit laporan struktural dengan mudah
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" /> Pratinjau
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSaveDocument}
                    >
                      <Save className="h-4 w-4 mr-1" /> Simpan
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Judul Dokumen</Label>
                      <Input
                        id="title"
                        placeholder="Masukkan judul dokumen"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="template">Template</Label>
                      <Select
                        value={selectedTemplate || ""}
                        onValueChange={handleTemplateSelect}
                      >
                        <SelectTrigger id="template">
                          <SelectValue placeholder="Pilih template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="bg-muted p-2 rounded-t-md flex flex-wrap gap-2 border border-b-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText("bold")}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText("italic")}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText("underline")}
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText("bulleted-list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText("numbered-list")}
                      >
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText("table")}
                      >
                        <Table className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => formatText("image")}
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      className="min-h-[500px] font-mono rounded-t-none"
                      value={documentContent}
                      onChange={(e) => setDocumentContent(e.target.value)}
                      placeholder="Mulai menulis konten dokumen Anda di sini..."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Terakhir diperbarui: {new Date().toLocaleString("id-ID")}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-1" /> Unggah
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Unduh
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Dokumen Tersimpan</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cari dokumen..."
                      className="pl-8 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Dokumen Baru
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                        Judul
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                        Template
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                        Terakhir Diubah
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                        Penulis
                      </th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">{doc.title}</td>
                        <td className="px-4 py-3">{doc.template}</td>
                        <td className="px-4 py-3">{doc.lastModified}</td>
                        <td className="px-4 py-3">{doc.author}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredDocuments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Tidak ada dokumen yang ditemukan
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {template.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={() => handleTemplateSelect(template.id)}
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Gunakan Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default EditorPage;
