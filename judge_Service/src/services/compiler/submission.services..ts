import { generateCppFile } from "./generateCppFile";
import { executeCode } from "./execute.services";
import { generateInputFile } from "./generateInputFile";

export async function submissionService(code:string,input:any){
    let path:string = generateCppFile(code);
    let inputPath: string  = generateInputFile(input);
    let output = await executeCode(path,inputPath);
    return output;
}