import jwt from "jsonwebtoken"

/**
 * Middleware to verify JWT token
 * Protects routes that require authentication
 */
export function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded // Attach admin info to request
    next()
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}
