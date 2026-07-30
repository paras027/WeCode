import { IProblem } from "../../models/problem.model";
import { chunkProblem } from "./chunker";
import { embedChunks } from "./embedder";
import { upsertChunks } from "./vectorStore";

export async function indexProblem(
    problem: IProblem
): Promise<void> {

    const chunks = chunkProblem(problem);
    console.log("all chunks: ",chunks.map(chunk => chunk.id));
    const embeddedChunks = await embedChunks(chunks);

    await upsertChunks(embeddedChunks);
}