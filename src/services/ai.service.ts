import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface AIProblemOutput {
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

export const processProblemWithAI = async (
    rawProblem: string
): Promise<AIProblemOutput> => {

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: [
            {
                role: "system",
                content: `
You are a programming problem data extraction assistant.

Extract and normalize the LeetCode problem data.

Return ONLY valid JSON matching this structure:

{
  "title": "string",
  "leetcodeId": 0,
  "slug": "string",
  "description": "string",
  "difficulty": "Easy",
  "topics": [],
  "constraints": [],
  "examples": [
    {
      "input": "string",
      "output": "string",
      "explanation": "string"
    }
  ],
  "patterns": []
}

For patterns, identify useful DSA solving patterns such as:
Sliding Window, Two Pointers, Binary Search,
Hashing, Stack, Monotonic Stack, BFS, DFS,
Dynamic Programming, Greedy, Backtracking, etc.

Do not add fields that are not requested.
                `,
            },
            {
                role: "user",
                content: rawProblem,
            },
        ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
        throw new Error("AI returned empty response");
    }

    return JSON.parse(content) as AIProblemOutput;
};