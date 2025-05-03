
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useStore } from "zustand";
import { chatOpen } from "@/stores/chatStore";

const ChatWidget = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isOpen = useStore(chatOpen, (state) => state.isOpen);
  const messages = useStore(chatOpen, (state) => state.messages);
  const addMessage = useStore(chatOpen, (state) => state.addMessage);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    addMessage("user", userMessage);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Berdasarkan data terkini, terdeteksi potensi gangguan keamanan di sektor Pasar Pelita.",
        "Analisis menunjukkan penurunan 15% dalam laporan konflik sosial bulan ini dibandingkan bulan lalu.",
        "Data dari Kementerian Dalam Negeri menunjukkan peningkatan aktivitas yang perlu diperhatikan di wilayah perbatasan.",
        "Berdasarkan pola historis, daerah tersebut memiliki potensi ancaman kategori sedang.",
        "Rekomendasi: tingkatkan patroli di area-area rawan pada akhir pekan ini.",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addMessage("assistant", randomResponse);
    }, 1000);
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
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="bg-fkdm-red hover:bg-red-700"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Kirim</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatWidget;
