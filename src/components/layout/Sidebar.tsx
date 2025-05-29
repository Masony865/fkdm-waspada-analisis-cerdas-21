
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart, TextCursor, Database, LogIn, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAuth } from "@/App";

interface SidebarProps {
  setIsLoginDialogOpen: (open: boolean) => void;
}

const Sidebar = ({ setIsLoginDialogOpen }: SidebarProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Only show these menu items if the user is authenticated
  const menuItems = isAuthenticated ? [
    {
      title: "Beranda",
      path: "/dashboard",
      icon: <Home className="w-5 h-5" />
    }, 
    {
      title: "Wilayah Operasi",
      path: "/wilayah-operasi",
      icon: <MapPin className="w-5 h-5" />
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
    },
    {
      title: "Wilayah Operasi",
      path: "/wilayah-operasi",
      icon: <MapPin className="w-5 h-5" />
    }
  ];

  return (
    <div className="hidden md:block w-64 border-r bg-muted/40">
      <div className="flex flex-col p-4 h-full">
        <div className="py-2">
          <h2 className="px-4 text-lg font-semibold">Menu</h2>
        </div>
        <nav className="space-y-1 py-2">
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", 
                location.pathname === item.path ? "bg-accent text-accent-foreground" : "transparent"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
          {!isAuthenticated && (
            <button 
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground w-full text-left"
              onClick={() => setIsLoginDialogOpen(true)}
            >
              <LogIn className="w-5 h-5" />
              Masuk
            </button>
          )}
        </nav>
        <div className="mt-auto">
          <Separator className="my-4" />
          <div className="px-3 py-2">
            <div className="text-xs text-muted-foreground">
              © 2025 FKDM Kota Sukabumi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
