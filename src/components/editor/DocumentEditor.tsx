
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Table,
  User,
  MapPin,
} from "lucide-react";
import { MemberSignature } from "@/types";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
}

interface DocumentEditorProps {
  templates: Template[];
  memberSignature: MemberSignature | null;
  onTemplateSelect: (templateId: string) => void;
}

const DocumentEditor = ({ templates, memberSignature, onTemplateSelect }: DocumentEditorProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      let content = template.content;
      
      // Auto-add member signature if logged in
      if (memberSignature) {
        const signatureSection = generateSignatureSection(memberSignature);
        content += signatureSection;
      }
      
      setDocumentContent(content);
      setDocumentTitle(`Baru: ${template.name}`);
      onTemplateSelect(templateId);
    }
  };

  const generateSignatureSection = (signature: MemberSignature): string => {
    return `

## Pembuat Laporan
- **Nama**: ${signature.nama}
- **Jabatan**: ${signature.jabatan}
- **Wilayah**: ${signature.kecamatan}, ${signature.kelurahan}
- **Tanggal**: ${new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  })}

---
*Laporan ini dibuat secara otomatis dengan tanda tangan digital FKDM*`;
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

    toast({
      title: "Dokumen Tersimpan",
      description: `"${documentTitle}" telah berhasil disimpan dengan tanda tangan digital`,
    });
  };

  const formatText = (format: string) => {
    toast({
      title: "Format Teks",
      description: `Teks diformat dengan: ${format}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Editor Laporan</CardTitle>
            <CardDescription>
              Buat dan edit laporan struktural dengan mudah
              {memberSignature && (
                <span className="block text-green-600 text-sm mt-1">
                  ✓ Tanda tangan akan ditambahkan otomatis
                </span>
              )}
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
          {memberSignature && (
            <span className="block text-green-600">
              Pembuat: {memberSignature.nama}
            </span>
          )}
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
  );
};

export default DocumentEditor;
