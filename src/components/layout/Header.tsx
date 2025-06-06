
import { useAuth } from "@/App";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, UserRound, Settings, TextCursor, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LoginDialog from "../dialogs/LoginDialog";
import { MemberPhotoService } from "@/services/memberPhotoService";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsLoginDialogOpen: (open: boolean) => void;
}

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen, setIsLoginDialogOpen }: HeaderProps) => {
  const { isAuthenticated, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Get member photo data for profile picture using userData.id as NIK
  const memberPhotoData = userData ? MemberPhotoService.getMemberByNIK(userData.id) : null;
  
  // Convert Google Drive sharing links to direct image URLs
  const getDirectImageUrl = (driveUrl: string) => {
    if (driveUrl && driveUrl.includes('drive.google.com/file/d/')) {
      const fileId = driveUrl.match(/\/d\/(.+?)\//)?.[1];
      return fileId ? `https://drive.google.com/thumbnail?id=${fileId}` : driveUrl;
    }
    return driveUrl;
  };

  const profileImageUrl = memberPhotoData ? getDirectImageUrl(memberPhotoData.pasfoto_convert) : "";

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side - Logo and brand */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/" className="flex items-center gap-3">
            <img src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png" alt="FKDM Logo" className="h-10 w-10" />
            <div className="hidden md:block">
              <span className="font-bold text-lg text-fkdm-red">FKDM Waspada</span>
              <p className="text-xs text-muted-foreground">Forum Kewaspadaan Dini Masyarakat</p>
            </div>
          </Link>
        </div>

        {/* Right side - User profile */}
        <div className="flex items-center gap-4">
          {isAuthenticated && userData && (
            <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-fkdm-red/5 to-fkdm-gold/5 px-4 py-2 rounded-lg border border-fkdm-gold/20">
              <Avatar className="h-12 w-12 border-2 border-fkdm-gold/50">
                <AvatarImage src={profileImageUrl} alt={userData.nama} />
                <AvatarFallback className="bg-fkdm-red text-white font-medium text-sm">
                  {userData.nama.split(' ').map(name => name[0]).join('').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-fkdm-red">
                  {userData.nama}
                </p>
                <p className="text-xs text-muted-foreground">
                  NIK: {userData.id}
                </p>
                <p className="text-xs text-fkdm-gold font-medium">
                  {userData.jabatan} | {userData.wilayah}
                </p>
              </div>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  {isAuthenticated && userData ? (
                    <AvatarImage src={profileImageUrl} alt={userData.nama} />
                  ) : null}
                  <AvatarFallback className="bg-fkdm-red text-white">
                    {isAuthenticated && userData ? 
                      userData.nama.split(' ').map(name => name[0]).join('').substring(0, 2).toUpperCase() : 
                      <UserRound className="h-5 w-5" />
                    }
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Login Anggota</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {isAuthenticated && userData ? (
                <>
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium leading-none">{userData.nama}</p>
                    <p className="text-xs text-muted-foreground mt-1">NIK: {userData.id}</p>
                    <p className="text-xs text-muted-foreground">{userData.jabatan}</p>
                    <p className="text-xs text-muted-foreground">{userData.wilayah}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/database-settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Pengaturan</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/editor")}>
                    <TextCursor className="mr-2 h-4 w-4" />
                    <span>Editor Laporan</span>
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
  );
};

export default Header;
