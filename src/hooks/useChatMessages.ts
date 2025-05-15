
import { useState } from "react";
import { useStore } from "zustand";
import { chatOpen } from "@/stores/chatStore";
import { useToast } from "@/hooks/use-toast";
import { sendMessageToOpenRouter } from "@/utils/openRouter";

export const useChatMessages = () => {
  const [input, setInput] = useState("");
  const messages = useStore(chatOpen, (state) => state.messages);
  const addMessage = useStore(chatOpen, (state) => state.addMessage);
  const isLoading = useStore(chatOpen, (state) => state.isLoading);
  const setIsLoading = useStore(chatOpen, (state) => state.setIsLoading);
  const { toast } = useToast();

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    addMessage("user", userMessage);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToOpenRouter(userMessage, messages);
      addMessage("assistant", aiResponse);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      toast({
        title: "Error",
        description: "Gagal mendapatkan respons. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    input,
    setInput,
    messages,
    isLoading,
    handleSendMessage
  };
};
