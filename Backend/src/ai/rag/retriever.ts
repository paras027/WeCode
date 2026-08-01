import { models } from "../config/ai";
import { index } from "./pinecone";

export interface RetrievedChunk {
    id: string;
    score: number;
    text: string;
    title: string;
    section: string;
    difficulty: string;
    tags: string[];
}

export async function retrieveRelevantChunks(
    question: string, problemId: string
): Promise<RetrievedChunk[]> {
    console.log("came into retriveal of chunks")
    const response = await models.embedQuery(question);
    console.log("got response of embedded content: ", response)

    if (!response) {
        throw new Error("Failed to generate query embedding.");
    }

    const results = await index.query({
        vector: response,
        topK: 10,
        includeMetadata: true,
        filter: {
            problemId: {
                $eq: problemId,
            },
        },
    });
    console.log("got res of embbeded: ",results)
    const matches = results.matches;
    console.log("git res of matches: ",
    matches.map(m => ({
        section: m.metadata?.section,
        score: m.score
    }))
);
    return matches.map(match => ({
        id: match.id,
        score: match.score ?? 0,
        text: String(match.metadata?.text ?? ""),
        title: String(match.metadata?.title ?? ""),
        section: String(match.metadata?.section ?? ""),
        difficulty: String(match.metadata?.difficulty ?? ""),
        tags: (match.metadata?.tags as string[]) ?? []
    }));
}