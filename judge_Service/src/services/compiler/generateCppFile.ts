import fs from 'fs';
import path from "path";
import {v4 as uuid } from "uuid";

const folderPath = path.join(__dirname,"../../temp");

if(!fs.existsSync(folderPath))
{
    fs.mkdirSync(folderPath,{
        recursive:true
    })
}

export function generateCppFile(code:string){
    const codeId = uuid();
    const fileName = `${codeId}.cpp`;
    const filePath = path.join(folderPath,fileName);

    fs.writeFileSync(
        filePath,code
    )
    return filePath;
}