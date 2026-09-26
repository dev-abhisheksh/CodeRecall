import { Request, Response } from "express";
import asyncHandler from "../../errors/asyncHandler.js";
import createProblem from "./problem.service.js";

const addProblem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const problem = await createProblem(req.body)

    res.status(201).json({
        success: true,
        message: "Problem added successful"
    })
})