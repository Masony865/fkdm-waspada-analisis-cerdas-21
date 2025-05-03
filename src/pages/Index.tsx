
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/App";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 fkdm-pattern">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8 inline-block animate-fade-in">
          <img
            src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png"
            alt="FKDM Logo"
            className="h-32 w-32 mx-auto mb-6 floating"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-fkdm-black mb-4">
            FKDM Waspada Analisis Cerdas
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Sistem Deteksi Dini dan Analisis Forum Kewaspadaan Dini Masyarakat
            (FKDM) Kota Sukabumi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto my-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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

        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="bg-fkdm-red hover:bg-red-700 text-white px-8 py-6 text-lg"
          >
            Masuk Sistem
          </Button>
        </div>
      </div>
      
      <footer className="w-full py-6 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-sm text-center text-muted-foreground">
            © 2025 Forum Kewaspadaan Dini Masyarakat (FKDM) Kota Sukabumi. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
