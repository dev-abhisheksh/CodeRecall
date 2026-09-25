import mongoose, { Schema, Document, Model } from "mongoose";

interface IExample {
    input: string;
    output: string;
    explanation?: string;
}

export interface IProblem extends Document {
    title: string;
    leetcodeId: number;
    slug: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    topics: string[];
    constraints: string[];
    examples: IExample[];
    patterns: string[];
}

const problemSchema = new Schema<IProblem>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        leetcodeId: {
            type: Number,
            required: true,
            unique: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        topics: {
            type: [String],
            default: [],
        },

        constraints: {
            type: [String],
            default: [],
        },

        examples: {
            type: [
                {
                    input: { type: String, required: true },
                    output: { type: String, required: true },
                    explanation: { type: String },
                },
            ],
            default: [],
        },

        patterns: {
            type: [String],
            default: [],
            index: true,
        },
    },
    { timestamps: true }
);


const Problem: Model<IProblem> = mongoose.model("Problem", problemSchema)

export default Problem;