
import Problem, { IProblem } from "./problem.model.js"

interface CreateProblemInput {
    title: string;
    leetcodeId: number;
    slug: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    topics: string[];
    constraints: string[];
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    patterns: string[];
}

const createProblem = async (data: CreateProblemInput): Promise<IProblem> => {

    const existingProblem = await Problem.findOne({ leetcodeId: data.leetcodeId })

    if (existingProblem) throw new Error("Problem already exists")

    const problem = await Problem.create(data)

    return problem;
}

export default createProblem;