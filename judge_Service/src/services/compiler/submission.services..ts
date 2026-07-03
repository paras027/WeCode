import { generateCodeFile } from "./generateCodeFile";
import { executeCode } from "./execute.services";
import { generateInputFile } from "./generateInputFile";

export async function submissionService(code: string, testcases: any, language: string, timeLimit:number,memoryLimit:number) {

    let extension = ""
    switch (language) {
        case "cpp":
            extension = "cpp";
            break;

        case "python":
            extension = "py";
            break;

        case "java":
            extension = "java";
            break;
    }
    let path: string = generateCodeFile(code, extension)
    // let inputPath: string = generateInputFile(input);
    let output = await executeCode(path, testcases, language,timeLimit,memoryLimit);
    console.log("Outpiut: ",output)
    let verdict
    let result: any = [];
    let runtime = output.runtime
    if (output.result[0].message === "Compilation Error") {
        return {
            verdict: "Compilation Error",
            error: output.result[0].output,
            runtime: runtime,
            result: result
        }

    }
    else {
        for (const res of output.result) {
            if (res.message === "Runtime Error") {
                return {
                    verdict: "Runtime Error",
                    error: res.output,
                    runtime: runtime,
                    result: result
                }
            }
            else if (res.message === "TLE") {
                result.push(res)
                return {
                    verdict: "TLE",
                    result: result,
                    error: '',
                    runtime: runtime
                }

            }
            else if (res.result === "Wrong Answer") {
                result.push(res);
                return {
                    verdict: "Wrong Answer",
                    result: result,
                    error: "",
                    runtime: 0
                }
            }
            else {
                verdict = "Passed"
                result.push(res)
            }
        }
        if (verdict === "Passed") {
            return {
                verdict: "Passed",
                result: result,
                runtime: runtime,
                error:""
            }
        }
    }

}