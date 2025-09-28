// Authentication controller for admin registration and login
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

// Input validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6
}

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "24h" })
}

// Register new admin
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      })
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      })
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findByEmail(email)
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      })
    }

    // Create new admin
    const newAdmin = await Admin.create(email, password, name)

    // Generate token
    const token = generateToken(newAdmin.id)

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
        },
        token,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

    if (error.code === "23505") {
      // PostgreSQL unique violation
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      })
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    })
  }
}

// Login admin
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      })
    }

    // Find admin by email
    const admin = await Admin.findByEmail(email)
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Verify password
    const isValidPassword = await Admin.verifyPassword(password, admin.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Generate token
    const token = generateToken(admin.id)

    res.json({
      success: true,
      message: "Login successful",
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
        token,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
    })
  }
}

// Get current admin profile
const getProfile = async (req, res) => {
  try {
    // Admin info is already available from auth middleware
    res.json({
      success: true,
      data: {
        admin: req.admin,
      },
    })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    })
  }
}

module.exports = {
  register,
  login,
  getProfile,
}
