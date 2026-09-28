import express from "express";
import { addProblem, fetchAllProblems } from "./problem.controller.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/add", upload.none(), addProblem);
router.get("/problemsets", fetchAllProblems)

export default router;