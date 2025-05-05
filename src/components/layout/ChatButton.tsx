
import { Button } from "@/components/ui/button";
import { useStore } from "zustand";
import { chatOpen } from "@/stores/chatStore";
import { X } from "lucide-react";

const ChatButton = () => {
  const isOpen = useStore(chatOpen, state => state.isOpen);
  const toggleChat = useStore(chatOpen, state => state.toggle);

  return (
    <Button 
      onClick={() => toggleChat()} 
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-fkdm-red hover:bg-red-700 h-14 w-14 p-3"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="h-6 w-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" 
          />
        </svg>
      )}
    </Button>
  );
};

export default ChatButton;
