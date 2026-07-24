import { compilationPrompt, compilationPromptInterface } from "../ai/prompts/compilationprompt"
import { generate } from "../ai/Providers/GeminiProviders"
import { HintRequest, buildHintPrompt, SYSTEM_PROMPT } from "../ai/prompts/hintPrompt";

export async function compilationExplanation(input: compilationPromptInterface): Promise<string> {
    const prompt = compilationPrompt(input);
    const response = await generate(prompt);
    const parsed = JSON.parse(response);

    return parsed;

}

export async function generateHints(data: HintRequest) {
    const prompt = `
${SYSTEM_PROMPT}

${buildHintPrompt(data)}
`;

    const response = await generate(prompt);

    const parsed = JSON.parse(response);

    return {
        ...parsed,
        hasMoreHints: data.hintLevel < 3
    };
}