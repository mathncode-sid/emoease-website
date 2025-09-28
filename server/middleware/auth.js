// Authentication middleware for protecting routes
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get admin details
    const admin = await Admin.findById(decoded.adminId)
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid token - admin not found",
      })
    }

    // Add admin info to request object
    req.admin = admin
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      })
    }

    console.error("Auth middleware error:", error)
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    })
  }
}

module.exports = { authenticateToken }
