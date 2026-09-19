import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const connectDb = async():Promise<void> =>{
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI!)
        console.log(`MongoDB connected : ${res.connection.host}`);
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}

export default connectDb;