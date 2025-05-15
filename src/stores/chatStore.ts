
import { create } from "zustand";

interface ChatState {
  isOpen: boolean;
  toggle: () => void;
  messages: {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }[];
  addMessage: (role: "user" | "assistant", content: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const chatOpen = create<ChatState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  messages: [],
  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          role,
          content,
          timestamp: new Date(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
