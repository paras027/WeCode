import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { askRag } from "../services/rag.service";
import ApiError from "../utils/ApiError";

export const chat = asyncHandler(
    async (req: Request, res: Response) => {

        const { message, problemId } = req.body;
        console.log("workioing here or not: ",req.body)
        if (!message?.trim()) {
            throw new ApiError(400, "Message is required.");
        }
        console.log("got message: ",message)
        const answer = await askRag(message,problemId);
        console.log("got answer: ",answer)
        return res.status(200).json(
            {
                answer,
                message:"Response generated successfully."
            }
        );
    }
);