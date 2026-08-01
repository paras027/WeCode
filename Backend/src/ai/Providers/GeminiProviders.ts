import { ai } from "../config/ai";

export async function generate(prompt:string){

    const response = await ai.invoke(prompt);

    return response.text ?? "";
}