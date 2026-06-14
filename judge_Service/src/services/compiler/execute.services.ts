import { exec } from "child_process"
import path from "path"
export function executeCode(filePath: string, inputPath: string) {
    return new Promise((resolve, reject) => {
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
        const dockerCommand = `docker run --rm \ -v ${folderPath}:/app/temp \ judge-image \ bash -c "g++ /app/temp/${fileName} -o /app/temp/${file}.exe && /app/temp/${file}.exe"
`;

        exec(dockerCommand,{timeout:2000}, (err, stdout, stderr) => {
            if (err) {
                if(err.killed)
                {
                    resolve("TLE");
                    return;
                }
                reject(err);
                console.log(`system error: cannot run the command ${err.message}`)
                return;
            }
            if (stderr) {
                reject(stderr);
                return
            }

                resolve(stdout)
        })
    })

}

