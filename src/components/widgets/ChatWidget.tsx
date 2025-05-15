
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Send, Loader2 } from "lucide-react";
import { useStore } from "zustand";
import { chatOpen } from "@/stores/chatStore";
import { useToast } from "@/hooks/use-toast";

// OpenRouter API constants
const OPENROUTER_API_KEY = "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";
const OPENROUTER_PROVISIONING_KEY = "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";

const ChatWidget = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isOpen = useStore(chatOpen, (state) => state.isOpen);
  const messages = useStore(chatOpen, (state) => state.messages);
  const addMessage = useStore(chatOpen, (state) => state.addMessage);
  const isLoading = useStore(chatOpen, (state) => state.isLoading);
  const setIsLoading = useStore(chatOpen, (state) => state.setIsLoading);
  const { toast } = useToast();

  const sendMessageToOpenRouter = async (userMessage: string) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "FKDM Waspada Kota Sukabumi",
          "X-Provisioning-Key": OPENROUTER_PROVISIONING_KEY
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [
            {
              role: "system",
              content: "Anda adalah asisten AI FKDM Waspada Kota Sukabumi. Berikan jawaban yang singkat, jelas, dan tepat menggunakan bahasa Indonesia tentang data keamanan, laporan kejadian, dan analisis ATHG (Ancaman, Tantangan, Hambatan, Gangguan) di Kota Sukabumi. Fokus pada jawaban yang membantu petugas FKDM dalam pelaporan dan pengambilan keputusan."
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user", 
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Gagal menghubungi OpenRouter API");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenRouter:", error);
      throw error;
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    addMessage("user", userMessage);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToOpenRouter(userMessage);
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-[30rem] flex flex-col shadow-lg z-50 border border-fkdm-gold/50">
      <CardHeader className="py-3 px-4 border-b bg-fkdm-black text-white">
        <CardTitle className="text-sm font-medium">
          Asisten FKDM Waspada
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <div className="mb-4 rounded-full bg-muted p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>
              <p className="text-sm">
                Selamat datang di Asisten FKDM Waspada. Silakan tanyakan tentang
                data analisis, potensi ancaman, atau bantuan lainnya.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%] text-sm",
                      message.role === "user"
                        ? "bg-fkdm-red text-white"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Memproses...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
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
      </CardContent>
    </Card>
  );
};

export default ChatWidget;
