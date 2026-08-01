
import { Chunk } from "./types";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import {models} from "../config/ai"

export interface EmbeddedChunk extends Chunk {
    embedding: number[];
}

export async function embedChunks(
    chunks: Chunk[]
): Promise<EmbeddedChunk[]> {


const response = await models.embedDocuments(
    chunks.map(chunk => chunk.text)
);


    return chunks.map((chunk, index) => {
        const embedding = response?.[index];

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