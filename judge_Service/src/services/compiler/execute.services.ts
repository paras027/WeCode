import { exec } from "child_process"
import path from "path"
import { compile } from "./compile.services"
import { runCode } from "./runCode.services"
import { generateInputFile } from "./generateInputFile"
type TestCaseResult = {
    message: string;
    input: any;
    expected: any;
    output: any;
    result: string;
};
export async function executeCode(filePath: string, testcases: any, language: string) {
    let folderPath = path.dirname(filePath);
    let fileName = path.basename(filePath);
    // let inputfileName = path.basename(inputPath);
    let file = path.parse(fileName).name
    let compileCom = `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "g++ /app/temp/${fileName} -o /app/temp/${file}.exe"`

    switch (language) {
        case "cpp":
            compileCom = `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "g++ /app/temp/${fileName} -o /app/temp/${file}.exe"`;
            // runCommand = "...";
            break;

        case "python":
            compileCom = "";
            break;

        case "javascript":
            compileCom = "";
            break;


        default:
            throw new Error("Unsupported Language");
    }

    let ans;
    let runResult = [];
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

   
    // console.log(runCommand);
    let Runtime = 0;
    console.log("working")
    for (const testcase of testcases) {
        const inputPath = generateInputFile(testcase.input);
        let inputfileName = path.basename(inputPath);
        let runCommand = "";

        switch (language) {

            case "cpp":
                runCommand =
                    `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "/app/temp/${file}.exe < /app/temp/${inputfileName}"`;
                break;

            case "python":
                runCommand =
                    `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "python3 /app/temp/${fileName} < /app/temp/${inputfileName}"`;
                break;

            case "javascript":
                runCommand =
                    `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "node /app/temp/${fileName} < /app/temp/${inputfileName}"`;
                break;
        }
        const output: any = await runCode(runCommand);
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

