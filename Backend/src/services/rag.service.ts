import { ai } from "../ai/config/ai";
import { buildRagPrompt } from "../ai/prompts/ragPrompts";
import { retrieveRelevantChunks } from "../ai/rag/retriever";

export async function askRag(
    question: string,problemId:string
): Promise<string> {
    console.log("entered service")
    const chunks = await retrieveRelevantChunks(question,problemId);
    console.log("got chunks in service: ",chunks)
    if (chunks.length === 0) {
        return "I couldn't find that information in the problem database.";
    }

    const prompt = buildRagPrompt(
        question,
        chunks
    );
    console.log("got the prompt: ",prompt)
   try {
    const response = await ai.invoke(prompt)

    console.log("AI Response:", response);

    return response.text ?? "No response generated.";
} catch (error) {
    console.error("Gemini Error:", error);
    throw error;
}
}