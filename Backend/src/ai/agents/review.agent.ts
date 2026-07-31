import { ai } from "../config/ai";
import { REVIEW_PROMPT } from "../prompts/reviewPrompts";
import { toolDeclarations } from "../Tools/toolDeclaration";
import { toolRegistry } from "../Tools/toolRegistry";
import { Content } from "@google/genai";
import { reviewSchema } from "../schema/review.schema";

export async function reviewSubmission(
    submissionId: string
) {
    console.log("came here to agent") 
    const contents: Content[] = [
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
    console.log("starting agent loop")
    while (true) {
        try{
            const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents,
            config: {
                tools: toolDeclarations,
                responseMimeType: "application/json",
                responseSchema: reviewSchema,
            },
        });
        console.log("got response ", response)
        const functionCall = response.functionCalls?.[0];
        console.log("got function ",functionCall)
        if (!functionCall) {
            return JSON.parse(response.text!);
        }
        console.log("got function name")
        const functionName = functionCall.name;

        const args = functionCall.args;

        const tool =
            toolRegistry[
            functionName as keyof typeof toolRegistry
            ];
            console.log("got tool ",tool)
        if (!tool) {
            throw new Error(
                `Unknown tool: ${functionName}`
            );
        }

        const toolResult = await tool(args as never);
        console.log("got tool result ",toolResult)
         const modelContent = response.candidates?.[0]?.content;

        if (!modelContent) {
            throw new Error("Gemini did not return model content.");
        }

        contents.push(modelContent);

        contents.push({
            role: "user",
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
        catch(e)
        {
            console.log("error: ",e)
            throw e;
        }
        

    }
}