import { IProblem } from "../../models/problem.model";
import { Chunk } from "./types";


export function chunkProblem(problem: IProblem): Chunk[] {
    const chunks: Chunk[] = [];

    // Description Chunk
    chunks.push({
        id: `${problem._id}-description`,
        text: `
Title: ${problem.title}

Description:
${problem.description}

Difficulty: ${problem.difficulty}

Tags:
${problem.tags.join(", ")}
        `.trim(),

        metadata: {
            problemId: problem._id.toString(),
            title: problem.title,
            section: "description",
            difficulty: problem.difficulty,
            tags: problem.tags,
            chunkIndex: 0
        }
    });

    // Constraints Chunk
    if (problem.constraints) {
        chunks.push({
            id: `${problem._id}-constraints`,
            text: `
Problem: ${problem.title}

Constraints:

${problem.constraints}
            `.trim(),

            metadata: {
                problemId: problem._id.toString(),
                title: problem.title,
                section: "constraints",
                difficulty: problem.difficulty,
                tags: problem.tags,
                chunkIndex: 0
            }
        });
    }

    // Example Chunks
    problem.examples.forEach((example, index) => {
        chunks.push({
            id: `${problem._id}-example-${index + 1}`,
            text: `
Problem: ${problem.title}

Example ${index + 1}

Input:
${example.input}

Output:
${example.output}

Explanation:
${example.explanation ?? "No explanation provided."}
            `.trim(),

            metadata: {
                problemId: problem._id.toString(),
                title: problem.title,
                section: "example",
                difficulty: problem.difficulty,
                tags: problem.tags,
                chunkIndex: index + 1
            }
        });
    });

    return chunks;
}