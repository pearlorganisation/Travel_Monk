import ApiErrorResponse from "./ApiErrorResponse.js";

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const message = `Validation Error: ${Object.values(err.errors)
      .map((val) => val.message)
      .join(", ")}`;
    err = new ApiErrorResponse(message, 400);
  }

  // Handle wrong MongoDB ObjectId errors
  if (err.name === "CastError") {
    const message = `Resource not found with this ID. Invalid ${err.path}`;
    err = new ApiErrorResponse(message, 400);
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    const message = `Duplicate key error: ${Object.keys(err.keyValue).join(
      ", "
    )} already exists.`;
    err = new ApiErrorResponse(message, 400);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again.";
    err = new ApiErrorResponse(message, 401);
  }

  // Handle JWT token expiration
  if (err.name === "TokenExpiredError") {
    const message = "Token expired. Please log in again.";
    err = new ApiErrorResponse(message, 401);
  }

  // Log the error for debugging (use a logging library in production)
  console.error(err);

  if (err.statusCode === 404) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404).json({ success: false, message: error.message });
};
