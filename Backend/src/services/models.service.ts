import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import apiConfig from "../config/config.js";

export const geminiModel = new ChatGoogle({
  model: "gemini-flash-lite-latest",
  apiKey: apiConfig.GOOGLE_API_KEY,
});

export const mistralModel = new ChatMistralAI({
  model: "mistral-small-2603",   
  apiKey: apiConfig.MISTRAL_API_KEY,
});

export const cohereModel = new ChatCohere({
  model: "command-r-plus-08-2024",
  apiKey: apiConfig.COHERE_API_KEY,
});

