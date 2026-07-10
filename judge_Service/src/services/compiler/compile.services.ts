import {exec} from "child_process"
import logger from "../../config/logger";

export function compile(path:string)
{
    return new Promise((resolve,reject)=>{

         exec(path, (err, stdout, stderr) => {
                    if (stderr) {
                        logger.error(stderr)
                        resolve({ message: "Compilation Error", output: stderr });
        
                        return
                    }
                    if (err) {
                        logger.error(err)
                        reject(err);
                        return;
                    }
        
                    resolve({ message: "Compiled", output: stdout });
                })
    })
}