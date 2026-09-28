import { Request, Response } from "express";
import asyncHandler from "../../errors/asyncHandler.js";
import createProblem from "./problem.service.js";
import { processProblemWithAI } from "../../services/ai.service.js";
import Problem from "./problem.model.js";

const addProblem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const rawProblemData = req.body;
    console.log(rawProblemData)

    const processDataWithAi = await processProblemWithAI(
        JSON.stringify(rawProblemData)
    )

    const problem = await createProblem(processDataWithAi)

    res.status(201).json({
        success: true,
        message: "Problem added successfully",
        problem
    })
})

const fetchAllProblems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;

    const skip = (page - 1) * limit;

    const problems = await Problem.find()
    .select("title leetcodeId difficulty patterns")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })

    const totalProblems = await Problem.countDocuments();

    res.status(200).json({
        success: true,
        message: "Fetched all problems",
        problems,
        totalProblems
    })
})

export {
    addProblem,
    fetchAllProblems
}