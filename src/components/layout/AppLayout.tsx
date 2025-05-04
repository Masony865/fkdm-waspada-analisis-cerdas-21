
import { useAuth } from "@/App";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Database, BarChart, TextCursor, LogIn, Home, Settings, Menu, X, ChevronDown, ChevronRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { chatOpen } from "@/stores/chatStore";
import { useStore } from "zustand";
import ChatWidget from "../widgets/ChatWidget";
import LoginDialog from "../dialogs/LoginDialog";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  showChat?: boolean;
}

const AppLayout = ({
  children,
  title,
  showChat = true
}: AppLayoutProps) => {
  const {
    isAuthenticated,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const isOpen = useStore(chatOpen, state => state.isOpen);
  const toggleChat = useStore(chatOpen, state => state.toggle);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [{
    title: "Beranda",
    path: "/dashboard",
    icon: <Home className="w-5 h-5" />
  }, {
    title: "Analisis Data",
    path: "/analisis",
    icon: <BarChart className="w-5 h-5" />
  }, {
    title: "Editor Laporan",
    path: "/editor",
    icon: <TextCursor className="w-5 h-5" />
  }, {
    title: "Pengaturan",
    path: "/database-settings",
    icon: <Database className="w-5 h-5" />
  }];

  return <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png" alt="FKDM Logo" className="h-10 w-9" />
              <span className="hidden md:inline-block font-bold text-lg">
                FKDM Waspada
              </span>
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-fkdm-red text-white">
                      {isAuthenticated ? "FK" : <UserRound className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Pengaturan</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => setIsLoginDialogOpen(true)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Masuk</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />

      {/* Mobile menu */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 top-16 z-20 bg-background/80 backdrop-blur-sm">
          <nav className="fixed inset-0 top-16 bottom-auto h-[calc(100vh-4rem)] w-full overflow-auto bg-background p-6">
            <div className="flex flex-col space-y-4">
              {menuItems.map(item => <Link key={item.path} to={item.path} className="flex items-center gap-2 py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>)}
            </div>
          </nav>
        </div>}

      <div className="flex-1 flex">
        {/* Sidebar (desktop only) */}
        <div className="hidden md:block w-64 border-r bg-muted/40">
          <div className="flex flex-col p-4 h-full">
            <div className="py-2">
              <h2 className="px-4 text-lg font-semibold">Menu</h2>
            </div>
            <nav className="space-y-1 py-2">
              {menuItems.map(item => <Link key={item.path} to={item.path} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", location.pathname === item.path ? "bg-accent text-accent-foreground" : "transparent")}>
                  {item.icon}
                  {item.title}
                </Link>)}
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

        {/* Main Content */}
        <main className="flex-1">
          <div className="container py-6">
            <div className="flex flex-col gap-1 mb-6">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <nav>
                <ul className="flex gap-1 text-sm text-muted-foreground">
                  <li>
                    <Link to="/dashboard" className="hover:text-foreground">
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li>{title}</li>
                </ul>
              </nav>
            </div>
            {children}
          </div>
        </main>
      </div>

      {/* Chat Widget */}
      {showChat && isAuthenticated && <>
          <Button onClick={() => toggleChat()} className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-fkdm-red hover:bg-red-700 h-14 w-14 p-3">
            {isOpen ? <X className="h-6 w-6" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>}
          </Button>
          <ChatWidget />
        </>}
    </div>;
};
export default AppLayout;
