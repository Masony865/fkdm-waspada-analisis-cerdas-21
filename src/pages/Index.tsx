import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginDialog from "@/components/dialogs/LoginDialog";
import { FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  
  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleCreateVisitorReport = () => {
    // Navigate to editor page for creating visitor report
    navigate("/editor");
  };
  
  return <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 fkdm-pattern">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8 inline-block animate-fade-in">
          <img src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png" alt="FKDM Logo" className="h-28 w-40 mx-auto mb-8 mt-8 floating object-contain" />
          <h1 className="text-4xl md:text-5xl font-bold text-fkdm-black mb-4">
            FKDM Waspada Analisis Cerdas
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Sistem Deteksi Dini dan Analisis Forum Kewaspadaan Dini Masyarakat
            (FKDM) Kota Sukabumi
          </p>

          <div className="mt-8">
            <Button 
              size="lg" 
              className="bg-fkdm-red hover:bg-red-700"
              onClick={() => setIsLoginDialogOpen(true)}
            >
              Masuk ke Sistem
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto my-12 animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-fkdm-gold/20 transition-transform hover:transform hover:scale-105">
            <div className="rounded-full bg-fkdm-red/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-fkdm-red">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Deteksi Dini</h3>
            <p className="text-muted-foreground text-sm">
              Identifikasi potensi Ancaman, Tantangan, Hambatan, dan Gangguan
              dari berbagai sumber data.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-fkdm-gold/20 transition-transform hover:transform hover:scale-105">
            <div className="rounded-full bg-fkdm-red/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-fkdm-red">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analisis Data</h3>
            <p className="text-muted-foreground text-sm">
              Visualisasi data dan analisis tren untuk pengambilan keputusan yang
              lebih baik.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-fkdm-gold/20 transition-transform hover:transform hover:scale-105">
            <div className="rounded-full bg-fkdm-red/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-fkdm-red">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
            <p className="text-muted-foreground text-sm">
              Integrasi kecerdasan buatan untuk membantu interpretasi data dan
              menyajikan insight.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-fkdm-gold/20 transition-transform hover:transform hover:scale-105">
            <div className="rounded-full bg-fkdm-red/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-fkdm-red">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Laporan Terstruktur</h3>
            <p className="text-muted-foreground text-sm">
              Editor teks dengan template untuk pembuatan laporan yang terstruktur dan efisien.
            </p>
          </div>
        </div>

        {/* Visitor Report Button - Added at the bottom */}
        <div className="mt-16 mb-8">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-fkdm-gold/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-fkdm-black mb-4">
              Format Laporan Pengunjung
            </h3>
            <p className="text-muted-foreground mb-6">
              Buat format laporan khusus untuk pengunjung dengan template yang telah disediakan
            </p>
            <Button 
              size="lg" 
              className="bg-fkdm-red hover:bg-red-700"
              onClick={handleCreateVisitorReport}
            >
              <FileText className="h-5 w-5 mr-2" />
              Buat Format Laporan Pengunjung
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="w-full py-6 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-sm text-center text-muted-foreground">
            © 2025 Forum Kewaspadaan Dini Masyarakat (FKDM) Kota Sukabumi. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </footer>

      <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
    </div>;
};
export default Index;
