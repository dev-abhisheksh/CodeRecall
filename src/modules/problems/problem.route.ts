import express from "express";
import { addProblem } from "./problem.controller.js";

const router = express.Router();

router.post("/add", addProblem);

export default router;