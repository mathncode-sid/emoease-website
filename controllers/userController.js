import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../config/db.js"

/**
 * Register a new user
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    // Check if user already exists
    const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get(email)
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Insert user into database
    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password) 
      VALUES (?, ?, ?)
    `)
    
    const result = insertUser.run(name, email, hashedPassword)

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.lastInsertRowid,
        name,
        email
      }
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * Login user
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Find user in database
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email)
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "24h" }
    )

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'user'
      }
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * Get user profile
 */
export const getUserProfile = (req, res) => {
  try {
    const userId = req.user.userId

    const user = db.prepare("SELECT id, name, email, createdAt FROM users WHERE id = ?").get(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({ user })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * Submit a blog post for review
 */
export const submitPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body
    const userId = req.user.userId
    const userEmail = req.user.email

    // Validate input
    if (!title || !content || !category) {
      return res.status(400).json({ error: "Title, content, and category are required" })
    }

    // Get user info for author name
    const user = db.prepare("SELECT name FROM users WHERE id = ?").get(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Create excerpt
    const excerpt = content.length > 150 ? content.substring(0, 150) + "..." : content

    // Insert post into database
    const insertPost = db.prepare(`
      INSERT INTO user_posts (title, content, excerpt, category, tags, author, user_id, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `)
    
    const result = insertPost.run(
      title,
      content,
      excerpt,
      category,
      JSON.stringify(tags || []),
      user.name,
      userId
    )

    res.status(201).json({
      message: "Post submitted for review successfully",
      post: {
        id: result.lastInsertRowid,
        title,
        content,
        excerpt,
        category,
        tags: tags || [],
        author: user.name,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error("Submit post error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * Get user's submitted posts
 */
export const getUserPosts = (req, res) => {
  try {
    const userId = req.user.userId
    const { status } = req.query

    let query = "SELECT * FROM user_posts WHERE user_id = ?"
    let params = [userId]

    if (status && status !== 'all') {
      query += " AND status = ?"
      params.push(status)
    }

    query += " ORDER BY createdAt DESC"

    const posts = db.prepare(query).all(...params)

    // Parse tags JSON for each post
    const postsWithParsedTags = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]')
    }))

    res.json({ posts: postsWithParsedTags })
  } catch (error) {
    console.error("Get user posts error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * Update user post (only if pending)
 */
export const updateUserPost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, category, tags } = req.body
    const userId = req.user.userId

    // Check if post exists and belongs to user
    const post = db.prepare("SELECT * FROM user_posts WHERE id = ? AND user_id = ?").get(id, userId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Only allow updating pending posts
    if (post.status !== 'pending') {
      return res.status(400).json({ error: "Can only edit pending posts" })
    }

    // Create excerpt
    const excerpt = content.length > 150 ? content.substring(0, 150) + "..." : content

    // Update post
    const updatePost = db.prepare(`
      UPDATE user_posts 
      SET title = ?, content = ?, excerpt = ?, category = ?, tags = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `)
    
    updatePost.run(
      title,
      content,
      excerpt,
      category,
      JSON.stringify(tags || []),
      id,
      userId
    )

    res.json({ message: "Post updated successfully" })
  } catch (error) {
    console.error("Update post error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * Delete user post (only if pending)
 */
export const deleteUserPost = (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    // Check if post exists and belongs to user
    const post = db.prepare("SELECT * FROM user_posts WHERE id = ? AND user_id = ?").get(id, userId)
    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Only allow deleting pending posts
    if (post.status !== 'pending') {
      return res.status(400).json({ error: "Can only delete pending posts" })
    }

    // Delete post
    const deletePost = db.prepare("DELETE FROM user_posts WHERE id = ? AND user_id = ?")
    deletePost.run(id, userId)

    res.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Delete post error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}