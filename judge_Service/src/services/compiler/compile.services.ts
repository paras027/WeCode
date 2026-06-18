import {exec} from "child_process"

export function compile(path:string)
{
    return new Promise((resolve,reject)=>{

         exec(path, (err, stdout, stderr) => {
                    if (stderr) {
                        console.log(stderr);
                        resolve({ message: "Compilation Error", output: stderr });
        
                        return
                    }
                    if (err) {
                        reject(err);
                        return;
                    }
        
                    resolve({ message: "Compiled", output: stdout });
                })
    })
}