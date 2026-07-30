import { ai } from "../config/ai";
import { Chunk } from "./types";

export interface EmbeddedChunk extends Chunk {
    embedding: number[];
}

export async function embedChunks(
    chunks: Chunk[]
): Promise<EmbeddedChunk[]> {

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: chunks.map(chunk => ({
            parts: [
                {
                    text: chunk.text
                }
            ]
        }))
    });

    if (!response.embeddings) {
        throw new Error("Failed to generate embeddings.");
    }

    return chunks.map((chunk, index) => {
        const embedding = response.embeddings?.[index]?.values;

        if (!embedding) {
            throw new Error(
                `Embedding missing for chunk ${chunk.id}`
            );
        }

        return {
            ...chunk,
            embedding
        };
    });
}