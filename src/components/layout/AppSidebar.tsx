
import { Home, BarChart, TextCursor, Database, LogIn, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/App";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface AppSidebarProps {
  setIsLoginDialogOpen: (open: boolean) => void;
}

const AppSidebar = ({ setIsLoginDialogOpen }: AppSidebarProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();

  const menuItems = isAuthenticated ? [
    {
      title: "Beranda",
      path: "/dashboard",
      icon: Home
    }, 
    {
      title: "Wilayah Operasi",
      path: "/wilayah-operasi",
      icon: MapPin
    },
    {
      title: "Analisis Data",
      path: "/analisis",
      icon: BarChart
    }, 
    {
      title: "Editor Laporan",
      path: "/editor",
      icon: TextCursor
    }, 
    {
      title: "Pengaturan",
      path: "/database-settings",
      icon: Database
    }
  ] : [
    {
      title: "Beranda",
      path: "/",
      icon: Home
    },
    {
      title: "Wilayah Operasi",
      path: "/wilayah-operasi",
      icon: MapPin
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r" collapsible="icon">
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {!isAuthenticated && (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setIsLoginDialogOpen(true)}>
                    <LogIn className="w-5 h-5" />
                    <span>Masuk</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <Separator className="my-4" />
        <div className="px-3 py-2">
          {state === "expanded" && (
            <div className="text-xs text-muted-foreground">
              © 2025 FKDM Kota Sukabumi
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
