
import { useStore } from "zustand";
import { chatOpen } from "@/stores/chatStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput";
import { useChatMessages } from "@/hooks/useChatMessages";

const ChatWidget = () => {
  const isOpen = useStore(chatOpen, (state) => state.isOpen);
  const {
    input,
    setInput,
    messages,
    isLoading,
    handleSendMessage
  } = useChatMessages();

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-[30rem] flex flex-col shadow-lg z-50 border border-fkdm-gold/50">
      <CardHeader className="py-3 px-4 border-b bg-fkdm-black text-white">
        <CardTitle className="text-sm font-medium">
          Asisten FKDM Waspada
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default ChatWidget;
