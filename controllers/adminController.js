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

/**
 * Get all user submissions for admin review
 */
export function getUserSubmissions(req, res, next) {
  try {
    const { status } = req.query

    let query = `
      SELECT up.*, u.email as user_email 
      FROM user_posts up 
      JOIN users u ON up.user_id = u.id
    `
    let params = []

    if (status && status !== 'all') {
      query += " WHERE up.status = ?"
      params.push(status)
    }

    query += " ORDER BY up.createdAt DESC"

    const submissions = db.prepare(query).all(...params)

    // Parse tags JSON for each submission
    const submissionsWithParsedTags = submissions.map(submission => ({
      ...submission,
      tags: JSON.parse(submission.tags || '[]')
    }))

    res.json({ submissions: submissionsWithParsedTags })
  } catch (error) {
    next(error)
  }
}

/**
 * Update user submission status (approve/reject)
 */
export function updateSubmissionStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status, feedback } = req.body

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Status must be 'approved' or 'rejected'" })
    }

    // Update submission
    const updateSubmission = db.prepare(`
      UPDATE user_posts 
      SET status = ?, admin_feedback = ?, updatedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `)
    
    const result = updateSubmission.run(status, feedback || null, id)

    if (result.changes === 0) {
      return res.status(404).json({ error: "Submission not found" })
    }

    // If approved, also add to main posts table for public display
    if (status === 'approved') {
      const submission = db.prepare("SELECT * FROM user_posts WHERE id = ?").get(id)
      if (submission) {
        const insertPost = db.prepare(`
          INSERT INTO posts (title, content, author) 
          VALUES (?, ?, ?)
        `)
        insertPost.run(submission.title, submission.content, submission.author)
      }
    }

    res.json({ 
      message: `Submission ${status} successfully`,
      status 
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get submission details by ID
 */
export function getSubmissionById(req, res, next) {
  try {
    const { id } = req.params

    const submission = db.prepare(`
      SELECT up.*, u.email as user_email, u.name as user_name
      FROM user_posts up 
      JOIN users u ON up.user_id = u.id 
      WHERE up.id = ?
    `).get(id)

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" })
    }

    // Parse tags JSON
    submission.tags = JSON.parse(submission.tags || '[]')

    res.json({ submission })
  } catch (error) {
    next(error)
  }
}
