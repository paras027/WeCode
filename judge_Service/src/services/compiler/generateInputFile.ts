import fs from 'fs';
import path from "path";
import {v4 as uuid } from "uuid";
import env from '../../config/env';

const folderPath = env.CONTAINER_WORKSPACE!;

if(!fs.existsSync(folderPath))
{
    fs.mkdirSync(folderPath,{
        recursive:true
    })
}

export function generateInputFile(inputText:string){
    const codeId = uuid();
    const fileName = `${codeId}.txt`;
    const filePath = path.join(folderPath,fileName);
    fs.writeFileSync(
        filePath,inputText
    )
    return filePath;
}