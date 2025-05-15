
import OpenAI from "openai";

// OpenRouter API constants
const OPENROUTER_API_KEY = "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";
const OPENROUTER_PROVISIONING_KEY = "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";

// Initialize OpenRouter client with OpenAI client
export const openrouterClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true, // Required for browser usage
  defaultHeaders: {
    "HTTP-Referer": window.location.origin,
    "X-Title": "FKDM Waspada Kota Sukabumi",
    "X-Provisioning-Key": OPENROUTER_PROVISIONING_KEY
  }
});

// Mock responses for fallback
export const mockResponses = [
  "Baik, saya akan membantu Anda menganalisis data laporan tersebut.",
  "Berdasarkan data ATHG terbaru, tingkat kerawanan di wilayah tersebut masuk kategori waspada.",
  "Laporan Anda telah dicatat. Tim akan segera menindaklanjuti situasi ini.",
  "Analisis menunjukkan tren penurunan insiden sebesar 15% dibanding bulan sebelumnya.",
  "Mohon berikan informasi lebih detail tentang lokasi dan waktu kejadian untuk analisis lebih lanjut."
];

// Send message to OpenRouter
export const sendMessageToOpenRouter = async (
  userMessage: string,
  messages: Array<{ role: "user" | "assistant"; content: string; }>
) => {
  try {
    // Try connecting to OpenRouter API using the OpenAI client
    try {
      // Convert message history to OpenAI format
      const messageHistory = [
        {
          role: "system" as const,
          content: "Anda adalah asisten AI FKDM Waspada Kota Sukabumi. Berikan jawaban yang singkat, jelas, dan tepat menggunakan bahasa Indonesia tentang data keamanan, laporan kejadian, dan analisis ATHG (Ancaman, Tantangan, Hambatan, Gangguan) di Kota Sukabumi. Fokus pada jawaban yang membantu petugas FKDM dalam pelaporan dan pengambilan keputusan."
        },
        ...messages.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        })),
        {
          role: "user" as const, 
          content: userMessage
        }
      ];

      // Call OpenRouter using the OpenAI client
      const completion = await openrouterClient.chat.completions.create({
        model: "anthropic/claude-3-haiku",
        messages: messageHistory,
        temperature: 0.7,
        max_tokens: 500
      });
      
      // Return the assistant's message
      return completion.choices[0].message.content;
    } catch (apiError) {
      console.error("OpenRouter API error:", apiError);
      
      // Use mock response as fallback
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      console.log("Using fallback response due to API error");
      return `${mockResponses[randomIndex]} [Mode Fallback]`;
    }
  } catch (error) {
    console.error("Error in message handling:", error);
    throw error;
  }
};
