import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js"

dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())

// Routes

app.use("/api/auth", authRoutes)


app.use(errorHandler)
export default app;