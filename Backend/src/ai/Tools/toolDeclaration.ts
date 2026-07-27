import {Tool, Type } from "@google/genai";

export const toolDeclarations:Tool[] = [
  {
    functionDeclarations: [
      {
        name: "getSubmission",
        description: "Retrieve a submission using its submission ID.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            submissionId: {
              type: Type.STRING,
              description: "The submission ID."
            }
          },
          required: ["submissionId"]
        }
      },
      {
        name: "getProblem",
        description: "Retrieve a problem using its problem ID.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            problemId: {
              type: Type.STRING,
              description: "The problem ID."
            }
          },
          required: ["problemId"]
        }
      }
    ]
  }
];