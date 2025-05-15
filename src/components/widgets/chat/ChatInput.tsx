
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e?: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const ChatInput = ({ input, setInput, handleSendMessage, isLoading }: ChatInputProps) => {
  return (
    <form
      onSubmit={handleSendMessage}
      className="border-t p-4 flex items-center gap-2"
    >
      <Input
        placeholder="Tulis pesan..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim() || isLoading}
        className="bg-fkdm-red hover:bg-red-700"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        <span className="sr-only">Kirim</span>
      </Button>
    </form>
  );
};

export default ChatInput;
