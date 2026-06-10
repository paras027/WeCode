import {exec} from "child_process"

export function executeCode(filePath:string)
{
    return new Promise((resolve,reject)=>{
        const outputFile = filePath.replace(
      ".cpp",
      ".exe"
    );
    const compileCommand = `g++ "${filePath}" -o "${outputFile}"`;
    exec(compileCommand,(err,stdout,stderr)=>{
        if(err){
            console.log(`system error: cannot run the command ${err.message}`)
            return;
        }
        if(stderr)
        {
            console.log(stderr);
            return
        }
        console.log(stdout);
        resolve(stdout);
    })
    })
    
}

