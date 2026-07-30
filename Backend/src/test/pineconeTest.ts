import {index} from "../ai/rag/pinecone"

async function test() {
    const stats = await index.describeIndexStats();

    console.log(stats);
}

test().catch(console.error);