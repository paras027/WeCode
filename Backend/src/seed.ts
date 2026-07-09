import mongoose from "mongoose";
import fs from "fs";
import Problem from "./models/problem.model";
import env from "./config/env";

async function seed() {
    await mongoose.connect(env.MONGO_URI);

    const data = JSON.parse(
    fs.readFileSync("./src/data.json", "utf8")
);

    await Problem.insertMany(data);

    console.log("Seeded successfully!");

    process.exit();
}

seed();