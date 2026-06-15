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
        const dockerCommand =
            `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "g++ /app/temp/${fileName} -o /app/temp/${file}.exe && /app/temp/${file}.exe < /app/temp/${inputfileName}"`;

        exec(dockerCommand, { timeout: 2000 }, (err, stdout, stderr) => {
            if (stderr) {
                console.log(stderr);
                resolve({ message: "Compilation Error", output: stderr });

                return
            }
            if (err) {
                if (err.killed) {
                    resolve({ message: "TLE", output: err });
                    return;
                }
                console.log(err);
                resolve({ message: "Runtime Error", output: err });
                return;
            }

            resolve({ message: "Output recieved", output: stdout });
        })
    })

}

