import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Problem from '../models/problem.model';
import ApiError from '../utils/ApiError';
import axios from "axios"
import { judgeQueue } from '../queue/judge.queue';
import Submission from '../models/submission.model';
import { publisher } from '../config/pubsub';


export const createProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, description, difficulty, tags, constraints, examples, testCases, starterCode } = req.body;

    const existingProblem = await Problem.findOne({ title });

    if (existingProblem) {
        throw new ApiError(400, "Problem with this title already exists");
    }

    const problem = await Problem.create({
        title,
        description,
        difficulty,
        tags,
        constraints,
        examples,
        starterCode,
        testCases,
        createdBy: req.user._id,
    })

    res.status(201).json({
        success: true,
        message: "Problem created successfully",
    })

})

export const getOneProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id;
    console.log("id: ",id)
    const problems = await Problem.findById(id)

    res.status(200).json({
        success: true,
        problems
    })
})

export const getProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const problems = await Problem.find()

    res.status(200).json({
        success: true,
        problems
    })
})

export const updateProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const problem = await Problem.findById(id);

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    if (problem.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update problems you created");
    }

    const updatedProblem = await Problem.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Problem updated successfully",
        problem: updatedProblem
    })

})

export const deleteProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const problem = await Problem.findById(id);

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    if (problem.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete problems you created");
    }

    await Problem.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Problem deleted successfully"
    })
})

export const submitCode = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { problemId, code } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(403, "problem not found");
    }
    const testcases = problem.testCases;
    if (testcases.length === 0) {
        throw new ApiError(403, "testcases not found");
    }
    const language = "cpp"

    const submission = await Submission.create({
        problemId,code,language,status:"Pending"
    })
    await publisher.publish("submission-update",JSON.stringify(submission))
    const job = await judgeQueue.add("submission",{
        submissionId:submission._id
    })

    return res.status(201).json({
        message:"Submitted",
        submissionId: submission._id
    })
})