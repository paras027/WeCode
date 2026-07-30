import { index } from "./pinecone";
import { EmbeddedChunk } from "./embedder";

export async function upsertChunks(
    chunks: EmbeddedChunk[]
): Promise<void> {

    await index.upsert({
        records: chunks.map(chunk => ({
            id: chunk.id,
            values: chunk.embedding,
            metadata: {
                text: chunk.text,
                ...chunk.metadata,
            },
        })),
    });

}