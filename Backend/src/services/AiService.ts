import { compilationPrompt, compilationPromptInterface } from "../ai/prompts/compilationprompt"
import { generate } from "../ai/Providers/GeminiProviders"


export async function compilationExplanation(input: compilationPromptInterface): Promise<string> {
    const prompt = compilationPrompt(input);
    const response = await generate(prompt);
    const parsed = JSON.parse(response);

    return parsed;

}