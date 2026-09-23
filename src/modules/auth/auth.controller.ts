import asyncHandler from "../../errors/asyncHandler.js";
import { Request, Response } from "express";
import RegisterUser from "../../types/auth/registerUser.js";
import User from "../user/user.model.js";
import ApiError from "../../errors/ApiError.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "./auth.utils.js";

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

    const hashPass = await bcrypt.hash(password, 10);

    sanitizedData.password = hashPass;

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

export {
    registerUser
}