import {GoogleGenAI} from "@google/genai"
import env from "../../config/env"

console.log("env value of key: ",env.GEMINI_KEY)

export const ai = new GoogleGenAI({
    apiKey: env.GEMINI_KEY
})