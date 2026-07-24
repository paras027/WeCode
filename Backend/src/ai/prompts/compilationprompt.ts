
export interface compilationPromptInterface{
    code:string,
    compileError:string,
    language:string
}

export function compilationPrompt(input:compilationPromptInterface):string{
    return `You are an expert programming mentor.

Your task is to explain a compilation error.

Programming Language:
${input.language}

User Code:
${input.code}

Compiler Error:
${input.compileError}

Rules:
- Explain the error simply.
- Do not rewrite the entire solution.
- Tell the user what caused the error.
- Suggest how to fix it.`;
}