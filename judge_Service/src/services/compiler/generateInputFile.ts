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

export function generateInputFile(inputText:object){
    const codeId = uuid();
    const fileName = `${codeId}.txt`;
    const filePath = path.join(folderPath,fileName);
    const inputVal =
      Object.values(inputText).join(" ");
    fs.writeFileSync(
        filePath,inputVal
    )
    return filePath;
}