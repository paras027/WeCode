import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Problem from '../models/problem.model';
import ApiError from '../utils/ApiError';
import { judgeQueue } from '../queue/judge.queue';
import Submission from '../models/submission.model';
import { publisher } from '../config/pubsub';
import { runQueue } from '../queue/run.queue';
import logger from '../config/logger';



export const getOneProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params.id;
    console.log("id: ",id)
    const problems = await Problem.findById(id)
    if(!problems)
    {
        throw new ApiError(404, "No problem found")
    }
    logger.info("Problem found")
    res.status(200).json({
        success: true,
        problems
    })
})

export const getProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    console.log("this works fine")
    const problems = await Problem.find()
    if(!problems)
    {
        throw new ApiError(404, "No problems found")
    }
    logger.info("Problems found")
    res.status(200).json({
        success: true,
        problems
    })
})

export const runCode = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { problemId, code, language } = req.body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
        throw new ApiError(403, "problem not found");
    }

    const testcases = problem.examples;
    if (testcases.length === 0) {
        throw new ApiError(403, "testcases not found");
    }
    const job = await runQueue.add("run",{
        problemId:problemId,code:code,language:language, userId:req.user._id
    })
    logger.info("Run code Submitted")  
    return res.status(201).json({
        message:"Submitted"
    })
})

export const submitCode = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { problemId, code,language } = req.body;
    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(403, "problem not found");
    }
    const testcases = problem.testCases;  
    if (testcases.length === 0) {
        throw new ApiError(403, "testcases not found");
    }

    const submission = await Submission.create({
        problemId,code,language,status:"Pending",problemName:problem.title
    })
    if(!submission)
    {
        throw new ApiError(401,"Could not create submision")
    }
    logger.info("Submission created")
    await publisher.publish("submission-update",JSON.stringify({submission,userId: req.user._id}))
    const job = await judgeQueue.add("submission",{
        submissionId:submission._id, userId:req.user._id    
    })
    logger.info("Submission created")
    return res.status(201).json({
        message:"Submitted",
        submissionId: submission._id
    })
})


export const submissions = asyncHandler(async (req: AuthRequest, res: Response) => {
    
    const id = req.user._id;
    const problemId = req.params.id;

    const problem = await Problem.findById(problemId);
    if (!problem) {
        throw new ApiError(403, "problem not found");
    }

    const submission = await Submission.find({
        userId:id,
        problemId
    })
    logger.info("Got submissions")
    return res.status(201).json({
        message:"Got submissions",
        submission:submission
    })
})

