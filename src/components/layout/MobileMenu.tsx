
import { Link } from "react-router-dom";
import { Home, BarChart, TextCursor, Database, LogIn } from "lucide-react";
import { useAuth } from "@/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsLoginDialogOpen: (open: boolean) => void;
}

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, setIsLoginDialogOpen }: MobileMenuProps) => {
  const { isAuthenticated, userData } = useAuth();

  // Only show these menu items if the user is authenticated
  const menuItems = isAuthenticated ? [
    {
      title: "Beranda",
      path: "/dashboard",
      icon: <Home className="w-5 h-5" />
    }, 
    {
      title: "Analisis Data",
      path: "/analisis",
      icon: <BarChart className="w-5 h-5" />
    }, 
    {
      title: "Editor Laporan",
      path: "/editor",
      icon: <TextCursor className="w-5 h-5" />
    }, 
    {
      title: "Pengaturan",
      path: "/database-settings",
      icon: <Database className="w-5 h-5" />
    }
  ] : [
    {
      title: "Beranda",
      path: "/",
      icon: <Home className="w-5 h-5" />
    }
  ];

  if (!isMobileMenuOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 top-16 z-20 bg-background/80 backdrop-blur-sm">
      <nav className="fixed inset-0 top-16 bottom-auto h-[calc(100vh-4rem)] w-full overflow-auto bg-background p-6">
        <div className="flex flex-col space-y-4">
          {/* Show user info on mobile menu when authenticated */}
          {isAuthenticated && userData && (
            <div className="flex items-center gap-3 py-3 border-b">
              <Avatar className="h-10 w-10 border border-fkdm-gold/30">
                <AvatarImage src={userData.pasfoto_convert || ""} alt={userData.nama} />
                <AvatarFallback className="bg-fkdm-red text-white">
                  {userData.nama.split(' ').map(name => name[0]).join('').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{userData.nama}</p>
                <p className="text-xs text-muted-foreground">{userData.jabatan} | {userData.wilayah}</p>
              </div>
            </div>
          )}
          
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="flex items-center gap-2 py-2 text-lg font-medium" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
          
          {!isAuthenticated && (
            <button 
              className="flex items-center gap-2 py-2 text-lg font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLoginDialogOpen(true);
              }}
            >
              <LogIn className="w-5 h-5" />
              <span>Masuk</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
