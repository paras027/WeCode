import { ai } from "../ai/config/ai";
import { buildRagPrompt } from "../ai/prompts/ragPrompts";
import { retrieveRelevantChunks } from "../ai/rag/retriever";
import { ragPromptTemplate } from "../ai/prompts/ragPrompts";

export async function askRag(
    question: string,problemId:string
): Promise<string> {
    try{
    console.log("entered service")
    const chunks = await retrieveRelevantChunks(question,problemId);
    console.log("got chunks in service: ",chunks)
    if (chunks.length === 0) {
        return "I couldn't find that information in the problem database.";
    }

    const context = buildRagPrompt(chunks);
    const chain = ragPromptTemplate.pipe(ai)

    const response = await chain.invoke({
        question,context
    })

    return response.text ?? "No response generated.";
} catch (error) {
    console.error("Gemini Error:", error);
    throw error;
}
}