import {exec} from "child_process"

export function executeCode(filePath:string,inputPath:string)
{
    return new Promise((resolve,reject)=>{
        const outputFile = filePath.replace(
      ".cpp",
      ".exe"
    );
    const compileCommand = `g++ "${filePath}" -o "${outputFile}"`;
    const execCommand = `${outputFile} < ${inputPath}`
    const newCommand = `docker run --rm judge-image g++ --version`
    exec(newCommand ,(err,stdout,stderr)=>{
                if(err)
                {
                    reject(err);
                    return;
                }
                if(stderr)
                {
                    reject(stderr)
                    return
                }

                resolve(stdout)
            })
        // exec(compileCommand,(err,stdout,stderr)=>{
        //     if(err){
        //         reject(err);
        //         console.log(`system error: cannot run the command ${err.message}`)
        //         return;
        //     }
        //     if(stderr)
        //     {
        //         reject(stderr);
        //         return
        //     }
        //     exec(execCommand ,(err,stdout,stderr)=>{
        //         if(err)
        //         {
        //             reject(err);
        //             return;
        //         }
        //         if(stderr)
        //         {
        //             reject(stderr)
        //             return
        //         }

        //         resolve(stdout)
        //     })
        // })
    })
    
}

