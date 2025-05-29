
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMemberSignature } from "@/utils/memberSignature";
import MemberSignatureIndicator from "@/components/editor/MemberSignatureIndicator";
import DocumentEditor from "@/components/editor/DocumentEditor";
import SavedDocuments from "@/components/editor/SavedDocuments";
import TemplateSelector from "@/components/editor/TemplateSelector";

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
  // State for logged-in member signature
  const [memberSignature, setMemberSignature] = useState(getMemberSignature());

  // Check for logged-in member on component mount
  useEffect(() => {
    setMemberSignature(getMemberSignature());
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    console.log("Template selected:", templateId);
  };

  return (
    <AppLayout title="Editor Laporan">
      <MemberSignatureIndicator memberSignature={memberSignature} />

      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Editor Laporan</TabsTrigger>
          <TabsTrigger value="saved">Dokumen Tersimpan</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <div className="grid gap-6">
            <DocumentEditor 
              templates={templates}
              memberSignature={memberSignature}
              onTemplateSelect={handleTemplateSelect}
            />
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <SavedDocuments documents={savedDocuments} />
        </TabsContent>

        <TabsContent value="templates">
          <TemplateSelector 
            templates={templates}
            onTemplateSelect={handleTemplateSelect}
          />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default EditorPage;
