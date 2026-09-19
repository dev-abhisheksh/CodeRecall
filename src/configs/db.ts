import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async():Promise<void> =>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI!)
        console.log(`MongoDB connected : ${res.connection.host}`);
    } catch (error) {
        process.exit(1);
    }
}

export default connectDb;