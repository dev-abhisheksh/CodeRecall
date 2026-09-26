import express from "express";
import { addProblem } from "./problem.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/add", upload.none(), addProblem);

export default router;