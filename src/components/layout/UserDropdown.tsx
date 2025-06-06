
import { useNavigate } from "react-router-dom";
import { LogIn, UserRound, Settings, TextCursor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/App";
import { getProfileImageUrl, getUserInitials } from "@/utils/profileUtils";

interface UserDropdownProps {
  setIsLoginDialogOpen: (open: boolean) => void;
}

const UserDropdown = ({ setIsLoginDialogOpen }: UserDropdownProps) => {
  const { isAuthenticated, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const profileImageUrl = userData ? getProfileImageUrl(userData) : "";
  const userInitials = userData ? getUserInitials(userData.nama) : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            {isAuthenticated && userData ? (
              <AvatarImage src={profileImageUrl} alt={userData.nama} />
            ) : null}
            <AvatarFallback className="bg-fkdm-red text-white">
              {isAuthenticated && userData ? userInitials : <UserRound className="h-5 w-5" />}
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
  );
};

export default UserDropdown;
