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
export async function executeCode(filePath: string, testcases: any, language: string,timeLimit:number,memoryLimit:number) {
    let folderPath = path.dirname(filePath);
    let fileName = path.basename(filePath);
    let file = path.parse(fileName).name
    let compileCom = `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "g++ /app/temp/${fileName} -o /app/temp/${file}.exe"`
    compileCom = compileCommand(language, folderPath, fileName);
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
        let Runtime = 0;
        console.log("working")
        for (const testcase of testcases) {
            const inputPath = generateInputFile(testcase.input);
            inputFiles.push(inputPath);
            let inputfileName = path.basename(inputPath);
            let runCommand = "";

            runCommand = runCommandMethod(language, folderPath, fileName, inputfileName,memoryLimit)

            const output: any = await runCode(runCommand,timeLimit);
            let res: TestCaseResult
            Runtime += +(output?.Runtime) || 0;
            if (output.message == "Runtime Error") {
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
            else if (output.message == "TLE") {
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
                    output: output.output,
                    result: output.output.trim() === testcase.output.trim() ? "Passed" : "Wrong Answer",
                }
                runResult.push(res);
                if (res.result === "Wrong Answer") {
                    break;
                }
            }
        }
        console.log(runResult + "Run Result msggggg ------------------");
        ans = {
            result: runResult,
            runtime: Runtime
        }
        console.log(ans + "Run Result msggggg ------------------");
        return ans;
    }
    finally {
        cleanupFiles(language,folderPath,filePath,inputFiles)
    }
}

