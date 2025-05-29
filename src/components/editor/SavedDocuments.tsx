
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Download, Trash2 } from "lucide-react";

interface SavedDocument {
  id: string;
  title: string;
  template: string;
  lastModified: string;
  author: string;
}

interface SavedDocumentsProps {
  documents: SavedDocument[];
}

const SavedDocuments = ({ documents }: SavedDocumentsProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter documents based on search
  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
  );
};

export default SavedDocuments;
