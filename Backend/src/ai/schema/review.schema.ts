import { Type } from "@google/genai";

export const reviewSchema = {
    type: Type.OBJECT,

    properties: {
        correctness: {
            type: Type.STRING,
        },

        rating: {
            type: Type.NUMBER,
        },

        timeComplexity: {
            type: Type.STRING,
        },

        spaceComplexity: {
            type: Type.STRING,
        },

        strengths: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
        },

        issues: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
        },

        suggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
        },

        overallFeedback: {
            type: Type.STRING,
        },
    },

    required: [
        "correctness",
        "rating",
        "timeComplexity",
        "spaceComplexity",
        "strengths",
        "issues",
        "suggestions",
        "overallFeedback",
    ],
};