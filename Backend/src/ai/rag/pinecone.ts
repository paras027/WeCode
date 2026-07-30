import { Pinecone } from "@pinecone-database/pinecone";
import env from "../../config/env";
const pinecone = new Pinecone({
    apiKey: env.PINECONEAPI,
});

export const index = pinecone.index(env.PINECONEINDEX);