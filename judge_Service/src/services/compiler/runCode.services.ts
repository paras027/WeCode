import {exec} from "child_process"

export function runCode(com:string){

    return new Promise((resolve,reject)=>{

        const start = Date.now();

        exec(com, { timeout: 5000 }, (err, stdout, stderr) => {
            const end = Date.now() - start;
            if (stderr) {
                console.log(stderr);
                resolve({ message: "Runtime Error", output: stderr,Runtime: end });

                return
            }
            if (err) {
                if (err.killed) {
                    resolve({ message: "TLE", output: err,Runtime: end});
                    return;
                }
            }

            resolve({ message: "Accepted", output: stdout,Runtime: end });
        })
    })
}