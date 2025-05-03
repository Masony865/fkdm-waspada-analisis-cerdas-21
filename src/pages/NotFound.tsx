
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Pengguna mencoba mengakses halaman yang tidak ada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 fkdm-pattern p-4">
      <img
        src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png"
        alt="FKDM Logo"
        className="h-20 w-20 mb-8"
      />
      <h1 className="text-4xl font-bold text-fkdm-black mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-6">
        Oops! Halaman yang Anda cari tidak ditemukan.
      </p>
      <Button asChild>
        <Link to="/" className="bg-fkdm-red hover:bg-red-700">
          Kembali ke Beranda
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
