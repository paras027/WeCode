import { ai } from "../config/ai";

export async function generate(prompt:string){

    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents:prompt
    })

    return response.text ?? "";
}