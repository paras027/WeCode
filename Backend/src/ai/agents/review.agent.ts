import { ai } from "../config/ai";
import { REVIEW_PROMPT } from "../prompts/reviewPrompts";
import { toolDeclarations } from "../Tools/toolDeclaration";
import { toolRegistry } from "../Tools/toolRegistry";
import { Content } from "@google/genai";

export async function reviewSubmission(
    submissionId: string
) {
    const contents:Content[] = [
        {
            role: "user",
            parts: [
                {
                    text: `
${REVIEW_PROMPT}

Submission ID: ${submissionId}
                    `,
                },
            ],
        },
    ];

    while (true) {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                tools: toolDeclarations,
            },
        });

        const functionCall = response.functionCalls?.[0];

        if (!functionCall) {
            return response.text;
        }

        const functionName = functionCall.name;

        const args = functionCall.args;

        const tool =
            toolRegistry[
                functionName as keyof typeof toolRegistry
            ];

        if (!tool) {
            throw new Error(
                `Unknown tool: ${functionName}`
            );
        }

        const toolResult = await tool(args as never);

        contents.push({
            role: "model",
            parts: [
                {
                    functionCall,
                },
            ],
        });

        contents.push({
            role: "tool",
            parts: [
                {
                    functionResponse: {
                        name: functionName,
                        response: toolResult as Record<string, unknown>
                    },
                },
            ],
        });
    }
}