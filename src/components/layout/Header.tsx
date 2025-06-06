
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/App";
import UserProfile from "./UserProfile";
import UserDropdown from "./UserDropdown";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsLoginDialogOpen: (open: boolean) => void;
}

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen, setIsLoginDialogOpen }: HeaderProps) => {
  const { isAuthenticated, userData } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side - Logo and brand */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/14426bc4-6a4c-4767-bed4-f1c0ede66761.png" 
              alt="FKDM Logo" 
              className="h-10 w-10" 
            />
            <div className="hidden md:block">
              <span className="font-bold text-lg text-fkdm-red">FKDM Waspada</span>
              <p className="text-xs text-muted-foreground">Forum Kewaspadaan Dini Masyarakat</p>
            </div>
          </Link>
        </div>

        {/* Right side - User profile */}
        <div className="flex items-center gap-4">
          {isAuthenticated && userData && (
            <UserProfile userData={userData} className="hidden md:flex" />
          )}

          <UserDropdown setIsLoginDialogOpen={setIsLoginDialogOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
