import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import {AuthRequest} from '../middlewares/auth.middleware';
import Problem from '../models/problem.model';
import ApiError from '../utils/ApiError';
import axios from "axios"


export const createProblem = asyncHandler(async(req:AuthRequest,res:Response)=>{
    const {title,description,difficulty,tags,constraints,examples,testCases,starterCode} = req.body;
    
    const existingProblem = await Problem.findOne({title});
    
    if(existingProblem){
        throw new ApiError(400,"Problem with this title already exists");
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
        success:true,
        message:"Problem created successfully",
    })

})

export const getOneProblem = asyncHandler(async(req:AuthRequest,res:Response)=>{
    const id = req.params.id;
    const problems = await Problem.findById(id)

        res.status(200).json({
            success:true,
            problems
        })
})

export const getProblem = asyncHandler(async(req:AuthRequest,res:Response)=>{
    const problems = await Problem.find(
        {
            createdBy:req.user._id
        })

        res.status(200).json({
            success:true,
            problems
        })
})

export const updateProblem = asyncHandler(async(req:AuthRequest,res:Response)=>{
    const {id} = req.params;
    const problem = await Problem.findById(id);

    if(!problem){
        throw new ApiError(404,"Problem not found");
    }

    if(problem.createdBy.toString() !== req.user._id.toString()){
        throw new ApiError(403,"You can only update problems you created");
    }

    const updatedProblem = await Problem.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
    })
    
    res.status(200).json({
        success:true,
        message:"Problem updated successfully",
        problem:updatedProblem
    })

})

export const deleteProblem = asyncHandler(async(req:AuthRequest,res:Response)=>{
    const {id} = req.params;
    const problem = await Problem.findById(id);

    if(!problem){
        throw new ApiError(404,"Problem not found");
    }

    if(problem.createdBy.toString() !== req.user._id.toString()){
        throw new ApiError(403,"You can only delete problems you created");
    }

    await Problem.findByIdAndDelete(id);

    res.status(200).json({
        success:true,
        message:"Problem deleted successfully"
    })
})

export const submitCode = asyncHandler(async(req:AuthRequest,res:Response)=>{
    const {problemId,code} = req.body;

    const problem = await Problem.findById(problemId);
    if(!problem)
    {
        throw new ApiError(403,"problem not found");
    }
    const testcases = problem.testCases;
    if(testcases.length===0)
    {
        throw new ApiError(403,"testcases not found");
    }
    const promise = testcases.map((testcase)=>{
        return axios.post("http://localhost:3000/submit/code",{code:code,input:testcase.input});
    })
    
    const result = await Promise.all(promise);
    const finalResult = result.map((res,index)=>{
        const expected = testcases[index].output
        const input = testcases[index].input
        const result = res.data.result;

        return {
            input:input,
            expected:expected,
            YourResult:result,
            Passed:expected.trim() === result.trim()  //to trim irrelevant spaces
        }
    })
    const allPassed = finalResult.every(tc=>tc.Passed)
    const hasTLE = finalResult.some(tc=>tc.YourResult==="TLE")
    let verdict = allPassed?"Accepted":"Wrong Answer";
    if(hasTLE)
    {
        verdict = "Time Limit Exceeded";
    }
    return res.status(201).json({
        message:"Result",
        verdit:verdict,
        result:finalResult
    })
})