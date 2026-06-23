import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Problem from '../models/problem.model';
import ApiError from '../utils/ApiError';
import axios from "axios"
import { judgeQueue } from '../queue/judge.queue';
import Submission from '../models/submission.model';


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
    const problems = await Problem.findById(id)

    res.status(200).json({
        success: true,
        problems
    })
})

export const getProblem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const problems = await Problem.find(
        {
            createdBy: req.user._id
        })

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

    const job = await judgeQueue.add("submission",{
        submissionId:submission._id
    })


//     const promise = testcases.map((testcase) => {
//         return axios.post("http://localhost:3000/submit/code", { code: code, input: testcase.input });
//     })

//     const result = await Promise.all(promise);
//     let finalResult = result.map((res, index) => {
//         const expected = testcases[index].output
//         const input = testcases[index].input
//         if (res.data.result.message === "Compilation Error") {
//             return {
//                 input: input,
//                 expected: expected,
//                 YourResult: "Compilation Error",
//                 output:res.data.result.output,
//                 Passed: false
//             }
//         }
//         if (res.data.result.message === "TLE") {
//             return {
//                 input: input,
//                 expected: expected,
//                 YourResult: "TLE",
//                 output:"",
//                 Passed: false
//             }
//         }
//         if (res.data.result.message === "Runtime Error") {
//             return {
//                 input: input,
//                 expected: expected,
//                 YourResult: "Runtime Error",
//                 output:res.data.result.output,
//                 Passed: false
//             }
//         }
//         //fixed code things
//         const result = res.data.result;
//         console.log(res.data.result.message)
//         console.log(expected.trim() === res.data.result.output.trim())
//         return {
//             input: input,
//             expected: expected,
//             YourResult: res.data.result.message,
//             output:res.data.result.output,
//             Passed: expected.trim() === res.data.result.output.trim(),
//             Runtime: result.Runtime
//   //to trim irrelevant spaces
//         }
//     })
   
//     let verdict;
//     const hasCompile = finalResult.filter((res)=>
//         res.YourResult === "Compilation Error"
//     )
    
//     const hasRuntime = finalResult.filter((res)=>
//         res.YourResult === "Runtime Error"
//     )
//     const hasTLE = finalResult.some(tc => tc.YourResult === "TLE")
//     if (hasCompile.length>0) {
//         verdict = "Compilation Error";
//         finalResult = hasCompile[0].output;
//     }
//     else if (hasTLE) {
//         verdict = "Time Limit Exceeded";
//     }
//     else if(hasRuntime.length>0){
//          console.log("yaha tk aaya")
//         verdict = "Runtime Error";
//         finalResult = hasRuntime[0].output;
//     }
//     else
//     {
       
//         const allPassed = finalResult.every(tc => tc.Passed)
//         verdict = allPassed ? "Accepted" : "Wrong Answerr";
//     }
     
//     return res.status(201).json({
//         message: "Result",
//         verdit: verdict,
//         result: finalResult
//     })
})