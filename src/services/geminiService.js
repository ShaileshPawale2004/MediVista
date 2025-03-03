import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// Chat model configuration
const chatConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
};

export async function getChatResponse(message) {
  try {
    // Get the chat model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create prompt
    const prompt = `As a healthcare assistant, please provide helpful information about health-related topics. If unsure, recommend consulting a healthcare professional.

User Question: ${message}`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}
