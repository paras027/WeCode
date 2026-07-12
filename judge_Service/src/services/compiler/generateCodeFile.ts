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

export function generateCodeFile(code:string,extension:string){
    const codeId = uuid();
    const fileName = extension === "java"?"Main.java":`${codeId}.${extension}`;
    const filePath = path.join(folderPath,fileName);

    fs.writeFileSync(
        filePath,code
    )
    return filePath;
}