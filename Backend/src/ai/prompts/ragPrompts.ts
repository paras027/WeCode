import { RetrievedChunk } from "../rag/retriever";
import { PromptTemplate } from "@langchain/core/prompts";

export const ragPromptTemplate = PromptTemplate.fromTemplate(`
You are an expert programming tutor helping users solve coding interview problems.

Your goal is NOT to copy or summarize the context.

Instead:

- Understand the user's question.
- Explain concepts in simple language.
- Teach as if the user is preparing for interviews.
- Use the context as the source of truth.
- Don't quote the context unless necessary.

Rules:
- Do not invent or assume information.
- Do not use outside knowledge.

====================

CONTEXT

{context}

====================

USER QUESTION

{question}

====================

ANSWER
`);


export function buildRagPrompt(
    chunks: RetrievedChunk[]
): string {

    const context = chunks
        .map(
            (chunk, index) => `
Context ${index + 1}

Title: ${chunk.title}
Section: ${chunk.section}
Difficulty: ${chunk.difficulty}
Tags: ${chunk.tags.join(", ")}

${chunk.text}
`
        )
        .join("\n--------------------\n");

    return context
}