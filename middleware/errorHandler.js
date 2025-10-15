/**
 * Global error handling middleware
 * Catches all errors and returns consistent JSON responses
 */
export function errorHandler(err, req, res, next) {
  console.error("Error:", err)

  // Default error
  let statusCode = err.statusCode || 500
  let message = err.message || "Internal server error"

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400
    message = err.message
  }

  if (err.code === "SQLITE_CONSTRAINT") {
    statusCode = 409
    message = "Database constraint violation"
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}
