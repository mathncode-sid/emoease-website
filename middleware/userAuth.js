import jwt from "jsonwebtoken"

/**
 * Middleware to authenticate users (not admins)
 */
export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key")
    
    // Check if this is a user token (not admin)
    if (decoded.role !== 'user') {
      return res.status(403).json({ error: "Access denied. User role required." })
    }

    req.user = decoded
    next()
  } catch (error) {
    console.error("User authentication error:", error)
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}