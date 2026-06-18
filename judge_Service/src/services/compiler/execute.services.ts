import { exec } from "child_process"
import path from "path"
import {compile} from "./compile.services"
import {runCode} from "./runCode.services"
export async function executeCode(filePath: string, inputPath: string) {
        const outputFile = filePath.replace(
            ".cpp",
            ".exe"
        );
        let folderPath = path.dirname(filePath);
        console.log(path.dirname(filePath) + "----------------------");
        let fileName = path.basename(filePath);
        let inputfileName = path.basename(inputPath);
        console.log(fileName + "_______________________________________________")
        const compileCommand = `g++ "${filePath}" -o "${outputFile}"`;
        const execCommand = `${outputFile} < ${inputPath}`
        let file = path.parse(fileName).name
        const compileCom = `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "g++ /app/temp/${fileName} -o /app/temp/${file}.exe"`
        const runCommand =
            `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "/app/temp/${file}.exe < /app/temp/${inputfileName}"`;
        const compileResult:any = await compile(compileCom);
        if(compileResult.message == "Compilation Error")
        {
            return compileResult;
        }
        console.log(compileResult.message);
        console.log(runCommand);
        const runResult = await runCode(runCommand);
        return runResult;
}   

