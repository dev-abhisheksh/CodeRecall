import asyncHandler from "../../errors/asyncHandler.js";
import { Request, Response } from "express";
import RegisterUser from "../../types/auth/registerUser.js";
import User from "../user/user.model.js";
import ApiError from "../../errors/ApiError.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "./auth.utils.js";
import LoginUser from "../../types/auth/loginUser.js";

const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, fullName, email, password } = req.body as RegisterUser;

    const sanitizedData: RegisterUser = {
        username: username.trim(),
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: password
    };

    const user = await User.findOne({ email: sanitizedData.email });
    if (user) throw new ApiError(400, "user alredy exists")


    const newUser = await User.create(sanitizedData)

    const accessToken = generateAccessToken(newUser?._id.toString())
    const refreshToken = generateRefreshToken(newUser?._id.toString())

    res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })

        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(201)
        .json({
            success: true,
            message: "user registered successfully"
        })
})

const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as LoginUser;

    if (!email || !password) throw new ApiError(400, "Both fields are required")

    const user = await User.findOne({ email })
        .select("+password")

    if (!user) throw new ApiError(400, "User not found. Please register")

    const isPassCorrect = await user.comparePassword(password);
    if (!isPassCorrect) throw new ApiError(400, "Invalid email or password")

    const accessToken = generateAccessToken(user._id.toString())
    const refreshToken = generateRefreshToken(user._id.toString());

    res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })

        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(200)
        .json({
            success: true,
            message: "user logged in successfully"
        })
})

export {
    registerUser,
    loginUser
}