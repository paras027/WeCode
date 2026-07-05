import fs from "fs"
import path from "path"

export function cleanupFiles(language:string,folderPath:string,filePath:string,inputFiles:string[]){
    let fileName = path.basename(filePath);
    let file = path.parse(fileName).name
     const statsFile = path.join(folderPath, `${file}_stats.txt`);
    if (fs.existsSync(statsFile)) {
        fs.unlinkSync(statsFile);
    }
    if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);

        }
        for (const inputFile of inputFiles) {
            if (fs.existsSync(inputFile)) {
                fs.unlinkSync(inputFile);
            }
        }
        if (language === "cpp") {
            const exePath = path.join(folderPath, `${file}.exe`);

            if (fs.existsSync(exePath)) {
                fs.unlinkSync(exePath);
            }
        }
        if (language === "java") {
            const classPath = path.join(folderPath, "Main.class");

            if (fs.existsSync(classPath)) {
                fs.unlinkSync(classPath);
            }
        }
}