import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    fullName: string;
    username: string;
    password: string;
    email: string;
    avatar?: string;
}

const userSchema = new Schema<IUser>({
    fullName: {
        required: true,
        type: String,
        trim: true,
    },

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    avatar: {
        type: String
    }

}, { timestamps: true });



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password)
}

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)

export default User;