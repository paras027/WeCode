import { exec } from "child_process"
import path from "path"
import { compile } from "./compile.services"
import { runCode } from "./runCode.services"
import { generateInputFile } from "./generateInputFile"
import { compileCommand, runCommandMethod } from "../../utils/SelectLanguage.utils"
import fs from "fs"
import { cleanupFiles } from "../../utils/cleanUpFile.utils"

type TestCaseResult = {
    message: string;
    input: any;
    expected: any;
    output: any;
    result: string;
};
export async function executeCode(filePath: string, testcases: any, language: string, timeLimit: number, memoryLimit: number) {
    let folderPath = path.dirname(filePath);
    let fileName = path.basename(filePath);
    let file = path.parse(fileName).name
    let compileCom = ``
    compileCom = compileCommand(language, folderPath, fileName, memoryLimit);
    let ans;
    let runResult = [];
    const inputFiles: string[] = [];
    console.log("File exists before compile:", fs.existsSync(filePath));
    console.log("File path:", filePath);
    try {
        if (compileCom !== "") {
            const compileResult: any = await compile(compileCom);
            console.log("Compile coming or not: ", compileResult)
            if (compileResult.message == "Compilation Error") {
                runResult.push(compileResult)
                ans = {
                    result: runResult,
                    runtime: 0
                }
                return ans;
            }
            console.log(compileResult.message + "compile msggggg ------------------");
        }

        console.log("working")
        for (const testcase of testcases) {
            console.log("testcase of run: ",testcase)
            const inputPath = generateInputFile(testcase.input);
            inputFiles.push(inputPath);
            let inputfileName = path.basename(inputPath);
            let runCommand = "";

            runCommand = runCommandMethod(language, folderPath, fileName, inputfileName, memoryLimit,timeLimit)

            const output: any = await runCode(runCommand);
            let res: TestCaseResult

            if (output.message === "Runtime Error") {
                res = {
                    message: output.message,
                    input: testcase.input,
                    expected: testcase.output,
                    output: output.output,
                    result: "",
                }
                runResult.push(res);
                break;
            }
            else if (output.message === "Memory Limit Exceeded") {
                res = {
                    message: output.message,
                    input: testcase.input,
                    expected: testcase.output,
                    output: output.output,
                    result: "",
                }
                runResult.push(res);
                break;
            }
            else if (output.message === "TLE") {
                res = {
                    message: output.message,
                    input: testcase.input,
                    expected: testcase.output,
                    output: output.output,
                    result: "",
                }
                runResult.push(res);
                break;
            }
            else {
                res = {
                    message: output.message,
                    input: testcase.input,
                    expected: testcase.output,
                    output: output.output.trim(),
                    result: output.output.trim() === testcase.output.trim() ? "Passed" : "Wrong Answer",
                }
                runResult.push(res);
                if (res.result === "Wrong Answer") {
                    break;
                }
            }
        }
        const hasTLE = runResult.some(r => r.message === "TLE");

        const stats = fs.readFileSync(
            path.join(folderPath, `${file}_stats.txt`),
            "utf8"
        );

        const [time, memory] = stats.trim().split(" ");

        let runtime = Math.round(parseFloat(time) * 1000);
        let memoryUsed = Number(memory);

        if (hasTLE) {
            runtime = timeLimit;
            memoryUsed = 0; // or whatever you decide
        }
        console.log(runResult + "Run Result msggggg ------------------");
        ans = {
            result: runResult,
            runtime: runtime,
            memory: memoryUsed
        }
        console.log(ans + "Run Result msggggg ------------------");
        return ans;
    }
    finally {
        cleanupFiles(language, folderPath, filePath, inputFiles)
    }
}

