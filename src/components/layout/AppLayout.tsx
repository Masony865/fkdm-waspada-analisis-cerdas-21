
import { useState } from "react";
import { useAuth } from "@/App";
import { useStore } from "zustand";
import { chatOpen } from "@/stores/chatStore";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import LoginDialog from "../dialogs/LoginDialog";
import ChatWidget from "../widgets/ChatWidget";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import AppSidebar from "./AppSidebar";
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* App Sidebar */}
        <AppSidebar setIsLoginDialogOpen={setIsLoginDialogOpen} />

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs title={title} />
          </header>

          {/* Page Content */}
          <main className="flex-1">
            <div className="container py-6">
              {children}
            </div>
          </main>
        </SidebarInset>

        {/* Login Dialog */}
        <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />

        {/* Mobile menu */}
        <MobileMenu 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsLoginDialogOpen={setIsLoginDialogOpen}
        />

        {/* Chat Widget */}
        {showChat && isAuthenticated && (
          <>
            <ChatButton />
            <ChatWidget />
          </>
        )}
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
