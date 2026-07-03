import path from "path"

export function compileCommand(language:string,folderPath:string,fileName:string){
    let compileCom:string = ""
    let file = path.parse(fileName).name
    switch (language) {
        case "cpp":
            compileCom = `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "g++ /app/temp/${fileName} -o /app/temp/${file}.exe"`;
            // runCommand = "...";
            break;

        case "python":
            compileCom = "";
            break;

        case "javascript":
            compileCom = "";
            break;

        case "java":
            compileCom =
                `docker run --rm -v "${folderPath}:/app/temp" judge-image bash -c "javac /app/temp/Main.java"`;
            break;

        default:
            throw new Error("Unsupported Language");
    }

    return compileCom;
}

export function runCommandMethod(language:string,folderPath:string,fileName:string,inputfileName:string,memoryLimit:number){
    let runCommand = ""
     let file = path.parse(fileName).name
    switch (language) {

            case "cpp":
                runCommand =
                    `docker run \
--rm \
--memory=${memoryLimit}m \
-v "${folderPath}:/app/temp" judge-image bash -c "/app/temp/${file}.exe < /app/temp/${inputfileName}"`;
                break;

            case "python":
                runCommand =
                    `docker run \
--rm \
--memory=${memoryLimit}m \
-v "${folderPath}:/app/temp" judge-image bash -c "python3 /app/temp/${fileName} < /app/temp/${inputfileName}"`;
                break;

            case "javascript":
                runCommand =
                    `docker run \
--rm \
--memory=${memoryLimit}m \
-v "${folderPath}:/app/temp" judge-image bash -c "node /app/temp/${fileName} < /app/temp/${inputfileName}"`;
                break;

            case "java":
                runCommand =
                    `docker run \
--rm \
--memory=${memoryLimit}m \
-v "${folderPath}:/app/temp" judge-image bash -c "java -cp /app/temp Main < /app/temp/${inputfileName}"`;
                break;

            default:
                throw new Error("Unsupported Language");
        }
        return runCommand;
}