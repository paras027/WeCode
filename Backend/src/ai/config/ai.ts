import {GoogleGenAI} from "@google/genai"
import env from "../../config/env"
import { ChatGoogleGenerativeAI,GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

console.log("env value of key: ",env.GEMINI_KEY)

export const ai = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
    apiKey: env.GEMINI_KEY
})

export const models = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: env.GEMINI_KEY,
});

export const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_KEY,
});