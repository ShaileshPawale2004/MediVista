import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});
const messages = [];
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};
// Chat model configuration
const chatConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
};


async function run(query) {
  console.log("27: ", query);
  
  messages.push({role: 'user', text: query });

  const chatSession = model.startChat({
    generationConfig,
    history: messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    })),
  });

  const result = await chatSession.sendMessage(query);
  const modelResponse = result.response.candidates[0].content.parts[0].text.replace(/\*/g, '');
  console.log("result: ", result.response.candidates[0].content.parts[0].text);
  
  // Update the chat history with the model's response
  messages.push({ role: 'model', text: modelResponse });
  return modelResponse;
}



export async function getChatResponse(message) {
  try {
    // Get the chat model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create prompt
    const prompt = `As a healthcare assistant, please provide helpful information about health-related topics. If unsure, recommend consulting a healthcare professional.

User Question: ${message}. give response in at max 5-6 lines`;

    // Generate response
    const result = await run(prompt);
    const response = result;
    console.log(response);
    
    return response;
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
}
