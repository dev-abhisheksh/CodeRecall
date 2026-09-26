import { Request, Response } from "express";
import asyncHandler from "../../errors/asyncHandler.js";
import createProblem from "./problem.service.js";
import { processProblemWithAI } from "../../services/ai.service.js";

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

export {
    addProblem
}