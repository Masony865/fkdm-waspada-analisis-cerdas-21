
import { useState } from "react";
import { useAuth } from "@/App";
import { useStore } from "zustand";
import { chatOpen } from "@/stores/chatStore";
import LoginDialog from "../dialogs/LoginDialog";
import ChatWidget from "../widgets/ChatWidget";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";
import ChatButton from "./ChatButton";

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
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const isOpen = useStore(chatOpen, state => state.isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsLoginDialogOpen={setIsLoginDialogOpen}
      />

      {/* Login Dialog */}
      <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />

      {/* Mobile menu */}
      <MobileMenu 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsLoginDialogOpen={setIsLoginDialogOpen}
      />

      <div className="flex-1 flex">
        {/* Sidebar (desktop only) */}
        <Sidebar setIsLoginDialogOpen={setIsLoginDialogOpen} />

        {/* Main Content */}
        <main className="flex-1">
          <div className="container py-6">
            <Breadcrumbs title={title} />
            {children}
          </div>
        </main>
      </div>

      {/* Chat Widget */}
      {showChat && isAuthenticated && (
        <>
          <ChatButton />
          <ChatWidget />
        </>
      )}
    </div>
  );
};

export default AppLayout;
