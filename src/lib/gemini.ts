import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let geminiModel: any = null;

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
} else {
  console.warn("VITE_GEMINI_API_KEY is not set. AI features will be disabled.");
  // Create a mock model for development
  geminiModel = {
    generateContent: async () => {
      return {
        response: {
          text: () => "AI features are currently unavailable. Please set VITE_GEMINI_API_KEY in your environment variables."
        }
      };
    }
  };
}

export { geminiModel };
