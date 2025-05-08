export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "ANALISA FKDM": {
        Row: {
          Deskripsi: string
          id: number
          Jenis: string
          Kategori: string
          Lokasi: string
          Status: string
          Tanggal: string
        }
        Insert: {
          Deskripsi: string
          id?: number
          Jenis: string
          Kategori: string
          Lokasi: string
          Status: string
          Tanggal?: string
        }
        Update: {
          Deskripsi?: string
          id?: number
          Jenis?: string
          Kategori?: string
          Lokasi?: string
          Status?: string
          Tanggal?: string
        }
        Relationships: []
      }
      "ANGGOTA FKDM": {
        Row: {
          ALAMAT: string | null
          BARCODE: string | null
          "BARCODE CONVERT": string | null
          id: number
          JABATAN: string | null
          KECAMATAN: string | null
          KELURAHAN: string | null
          KOTA: string | null
          NAMA: string | null
          NIK: string | null
          PASFOTO: string | null
          "PASFOTO CONVERT": string | null
          PEKERJAAN: string | null
          RT: string | null
          RW: string | null
          "TANGGAL LAHIR": string | null
          "TEMPAT LAHIR": string | null
          WILAYAH: string | null
        }
        Insert: {
          ALAMAT?: string | null
          BARCODE?: string | null
          "BARCODE CONVERT"?: string | null
          id?: number
          JABATAN?: string | null
          KECAMATAN?: string | null
          KELURAHAN?: string | null
          KOTA?: string | null
          NAMA?: string | null
          NIK?: string | null
          PASFOTO?: string | null
          "PASFOTO CONVERT"?: string | null
          PEKERJAAN?: string | null
          RT?: string | null
          RW?: string | null
          "TANGGAL LAHIR"?: string | null
          "TEMPAT LAHIR"?: string | null
          WILAYAH?: string | null
        }
        Update: {
          ALAMAT?: string | null
          BARCODE?: string | null
          "BARCODE CONVERT"?: string | null
          id?: number
          JABATAN?: string | null
          KECAMATAN?: string | null
          KELURAHAN?: string | null
          KOTA?: string | null
          NAMA?: string | null
          NIK?: string | null
          PASFOTO?: string | null
          "PASFOTO CONVERT"?: string | null
          PEKERJAAN?: string | null
          RT?: string | null
          RW?: string | null
          "TANGGAL LAHIR"?: string | null
          "TEMPAT LAHIR"?: string | null
          WILAYAH?: string | null
        }
        Relationships: []
      }
      aspek_kehidupan: {
        Row: {
          created_at: string | null
          deskripsi: string | null
          id: string
          nama: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          nama: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          nama?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      kecamatan: {
        Row: {
          created_at: string | null
          deskripsi: string | null
          id: string
          kode: string | null
          nama: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          kode?: string | null
          nama: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          kode?: string | null
          nama?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      kelurahan: {
        Row: {
          created_at: string | null
          deskripsi: string | null
          id: string
          kecamatan_id: string
          kode: string | null
          nama: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          kecamatan_id: string
          kode?: string | null
          nama: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          kecamatan_id?: string
          kode?: string | null
          nama?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kelurahan_kecamatan_id_fkey"
            columns: ["kecamatan_id"]
            isOneToOne: false
            referencedRelation: "kecamatan"
            referencedColumns: ["id"]
          },
        ]
      }
      laporan: {
        Row: {
          aspek_id: string
          bukti_url: string[] | null
          created_at: string | null
          deskripsi: string
          id: string
          jenis: Database["public"]["Enums"]["jenis_athg"]
          judul: string
          kecamatan_id: string
          kelurahan_id: string
          lokasi_detail: string | null
          pelapor_id: number | null
          pelapor_nama: string | null
          status: Database["public"]["Enums"]["status_laporan"]
          tanggal_kejadian: string
          tindak_lanjut: string | null
          updated_at: string | null
          waktu_kejadian: string | null
        }
        Insert: {
          aspek_id: string
          bukti_url?: string[] | null
          created_at?: string | null
          deskripsi: string
          id?: string
          jenis: Database["public"]["Enums"]["jenis_athg"]
          judul: string
          kecamatan_id: string
          kelurahan_id: string
          lokasi_detail?: string | null
          pelapor_id?: number | null
          pelapor_nama?: string | null
          status?: Database["public"]["Enums"]["status_laporan"]
          tanggal_kejadian: string
          tindak_lanjut?: string | null
          updated_at?: string | null
          waktu_kejadian?: string | null
        }
        Update: {
          aspek_id?: string
          bukti_url?: string[] | null
          created_at?: string | null
          deskripsi?: string
          id?: string
          jenis?: Database["public"]["Enums"]["jenis_athg"]
          judul?: string
          kecamatan_id?: string
          kelurahan_id?: string
          lokasi_detail?: string | null
          pelapor_id?: number | null
          pelapor_nama?: string | null
          status?: Database["public"]["Enums"]["status_laporan"]
          tanggal_kejadian?: string
          tindak_lanjut?: string | null
          updated_at?: string | null
          waktu_kejadian?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laporan_aspek_id_fkey"
            columns: ["aspek_id"]
            isOneToOne: false
            referencedRelation: "aspek_kehidupan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laporan_kecamatan_id_fkey"
            columns: ["kecamatan_id"]
            isOneToOne: false
            referencedRelation: "kecamatan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laporan_kelurahan_id_fkey"
            columns: ["kelurahan_id"]
            isOneToOne: false
            referencedRelation: "kelurahan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "laporan_pelapor_id_fkey"
            columns: ["pelapor_id"]
            isOneToOne: false
            referencedRelation: "ANGGOTA FKDM"
            referencedColumns: ["id"]
          },
        ]
      }
      notifikasi: {
        Row: {
          anggota_id: number | null
          created_at: string | null
          dibaca: boolean | null
          id: string
          judul: string
          laporan_id: string | null
          pesan: string
        }
        Insert: {
          anggota_id?: number | null
          created_at?: string | null
          dibaca?: boolean | null
          id?: string
          judul: string
          laporan_id?: string | null
          pesan: string
        }
        Update: {
          anggota_id?: number | null
          created_at?: string | null
          dibaca?: boolean | null
          id?: string
          judul?: string
          laporan_id?: string | null
          pesan?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifikasi_anggota_id_fkey"
            columns: ["anggota_id"]
            isOneToOne: false
            referencedRelation: "ANGGOTA FKDM"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifikasi_laporan_id_fkey"
            columns: ["laporan_id"]
            isOneToOne: false
            referencedRelation: "laporan"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      jenis_athg: "Ancaman" | "Tantangan" | "Hambatan" | "Gangguan"
      status_laporan: "Diterima" | "Diproses" | "Selesai" | "Ditolak"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      jenis_athg: ["Ancaman", "Tantangan", "Hambatan", "Gangguan"],
      status_laporan: ["Diterima", "Diproses", "Selesai", "Ditolak"],
    },
  },
} as const
