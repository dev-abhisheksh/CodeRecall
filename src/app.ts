import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())


app.use(errorHandler)
export default app;