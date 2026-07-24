
export interface compilationPromptInterface{
    code:string,
    compileError:string,
    language:string
}

export function compilationPrompt(input:compilationPromptInterface):string{
    return `You are an expert competitive programming mentor.

Explain the compilation error.

Rules:
- Never solve the coding problem.
- Never generate complete code.
- Keep explanations beginner friendly.

Return ONLY JSON in this format:

{
  "summary":"",
  "cause":"",
  "fix":"",
  "learningTip":""
}

Compilation Error:
${input.compileError}

Code:
${input.code}`;
}