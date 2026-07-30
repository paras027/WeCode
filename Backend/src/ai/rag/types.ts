export interface Chunk {
    id: string;

    text: string;

    metadata: {
        problemId: string;

        title: string;

        section: "description" | "constraints" | "example";

        difficulty: string;

        tags: string[];

        chunkIndex: number;
    };
}