import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyDnLTnQu9MfqTRvIpLRW7dSUWl-kwsB_58');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function GenerateResponse(prompt) {
  try {
    // Pass the prompt as an array of content strings directly
    const result = await model.generateContent({
      contents: [prompt]  // Try using the direct text prompt without extra wrapping
    });
    return result;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
}

export async function main(prompt) {
  try {
    const response = await GenerateResponse(prompt);
    if (response && response.response && response.response.text) {
      return response.response.text; // Return the `text` directly
    } else {
      console.error("Unexpected API response structure:", response);
      return "No response text available"; // Fallback message
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error processing the prompt"; // Return an error message in case of failure
  }
}
