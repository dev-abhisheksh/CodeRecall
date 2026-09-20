import { ErrorRequestHandler } from "express";
import ApiError from "../errors/ApiError.js";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  const error =
    err instanceof ApiError
      ? err
      : new ApiError(500, err?.message || "Internal Server Error");

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export default errorHandler;
