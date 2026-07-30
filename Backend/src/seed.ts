import mongoose from "mongoose";
import fs from "fs";
import Problem from "./models/problem.model";
import env from "./config/env";
import { indexProblem } from "./ai/rag/indexer"

async function seed() {
    try {
        await mongoose.connect(env.MONGO_URI);

        await Problem.deleteMany({});

        const data = JSON.parse(
            fs.readFileSync("./src/data.json", "utf8")
        );

        await Problem.insertMany(data);
        const problems = await Problem.find();

        if (!problems) {
            throw new Error("Problem not found");
        }

        for (const problem of problems) {
            await indexProblem(problem);
        }

        console.log("Seeded Successfully");
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

seed();