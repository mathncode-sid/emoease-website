import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../config/db.js"

const SALT_ROUNDS = 10

/**
 * Register a new admin
 */
export async function register(req, res, next) {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // Insert admin into database
    const stmt = db.prepare("INSERT INTO admins (email, password) VALUES (?, ?)")
    const result = stmt.run(email, hashedPassword)

    res.status(201).json({
      message: "Admin registered successfully",
      adminId: result.lastInsertRowid,
    })
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({ error: "Email already registered" })
    }
    next(error)
  }
}

/**
 * Login admin and return JWT token
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Find admin by email
    const stmt = db.prepare("SELECT * FROM admins WHERE email = ?")
    const admin = stmt.get(email)

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password)

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "24h" })

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    })
  } catch (error) {
    next(error)
  }
}
