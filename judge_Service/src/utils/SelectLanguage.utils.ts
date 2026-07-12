import path from "path"
import dockerOptions from "./dockerCommand.utils";
import env from "../config/env";

export function compileCommand(language: string, folderPath: string, fileName: string, memoryLimit: number) {
    let compileCom: string = ""
    let file = path.parse(fileName).name
    const options = dockerOptions(memoryLimit)
    switch (language) {
        case "cpp":
            compileCom = `docker run ${options} -v "${env.WORKSPACE}:${env.CONTAINER_WORKSPACE}" judge-image bash -c "g++ ${env.CONTAINER_WORKSPACE}/${fileName} -o ${env.CONTAINER_WORKSPACE}/${file}.exe"`;
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
                `docker run ${options} -v "${env.WORKSPACE}:${env.CONTAINER_WORKSPACE}" judge-image bash -c "javac ${env.CONTAINER_WORKSPACE}/Main.java"`;
            break;

        default:
            throw new Error("Unsupported Language");
    }

    return compileCom;
}

export function runCommandMethod(language: string, folderPath: string, fileName: string, inputfileName: string, memoryLimit: number, timeLimit: number) {
    let runCommand = ""
    let file = path.parse(fileName).name
    const options = dockerOptions(memoryLimit)
    const timeout = (timeLimit / 1000).toFixed(3);
    switch (language) {

        case "cpp":
            runCommand =
                `docker run ${options} -v "${env.WORKSPACE}:${env.CONTAINER_WORKSPACE}" judge-image bash -c "timeout ${timeout}s /usr/bin/time -q -f '%e %M' -o ${env.CONTAINER_WORKSPACE}/${file}_stats.txt ${env.CONTAINER_WORKSPACE}/${file}.exe < ${env.CONTAINER_WORKSPACE}/${inputfileName}"`;
            break;

        case "python":
            runCommand =
                `docker run ${options} -v "${env.WORKSPACE}:${env.CONTAINER_WORKSPACE}" judge-image bash -c "/usr/bin/time -q -f '%e %M' -o ${env.CONTAINER_WORKSPACE}/${file}_stats.txt timeout ${timeout}s python3 ${env.CONTAINER_WORKSPACE}/${fileName} < ${env.CONTAINER_WORKSPACE}/${inputfileName}"`;
            break;

        case "javascript":
            runCommand =
                `docker run ${options} -v "${env.WORKSPACE}:${env.CONTAINER_WORKSPACE}" judge-image bash -c "/usr/bin/time -q -f '%e %M' -o ${env.CONTAINER_WORKSPACE}/${file}_stats.txt timeout ${timeout}s node ${env.CONTAINER_WORKSPACE}/${fileName} < ${env.CONTAINER_WORKSPACE}/${inputfileName}"`;
            break;

        case "java":
            runCommand =
                `docker run ${options} -v "${env.WORKSPACE}:${env.CONTAINER_WORKSPACE}" judge-image bash -c "/usr/bin/time -q -f '%e %M' -o ${env.CONTAINER_WORKSPACE}/${file}_stats.txt timeout ${timeout}s java -cp ${env.CONTAINER_WORKSPACE} Main < ${env.CONTAINER_WORKSPACE}/${inputfileName}"`;
            break;

        default:
            throw new Error("Unsupported Language");
    }
    return runCommand;
}