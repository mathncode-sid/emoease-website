import db from "../config/db.js"

/**
 * Get all posts (public)
 */
export function getAllPosts(req, res, next) {
  try {
    const stmt = db.prepare("SELECT * FROM posts ORDER BY createdAt DESC")
    const posts = stmt.all()
    res.json(posts)
  } catch (error) {
    next(error)
  }
}

/**
 * Get single post by ID (public)
 */
export function getPostById(req, res, next) {
  try {
    const { id } = req.params
    const stmt = db.prepare("SELECT * FROM posts WHERE id = ?")
    const post = stmt.get(id)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json(post)
  } catch (error) {
    next(error)
  }
}

/**
 * Create new post (admin only)
 */
export function createPost(req, res, next) {
  try {
    const { title, content, author } = req.body

    // Validate input
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Title, content, and author are required" })
    }

    if (title.trim().length === 0 || content.trim().length === 0) {
      return res.status(400).json({ error: "Title and content cannot be empty" })
    }

    // Insert post
    const stmt = db.prepare("INSERT INTO posts (title, content, author) VALUES (?, ?, ?)")
    const result = stmt.run(title.trim(), content.trim(), author.trim())

    // Get the created post
    const getStmt = db.prepare("SELECT * FROM posts WHERE id = ?")
    const post = getStmt.get(result.lastInsertRowid)

    res.status(201).json({
      message: "Post created successfully",
      post,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Update post (admin only)
 */
export function updatePost(req, res, next) {
  try {
    const { id } = req.params
    const { title, content, author } = req.body

    // Validate input
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Title, content, and author are required" })
    }

    if (title.trim().length === 0 || content.trim().length === 0) {
      return res.status(400).json({ error: "Title and content cannot be empty" })
    }

    // Update post
    const stmt = db.prepare(
      "UPDATE posts SET title = ?, content = ?, author = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
    )
    const result = stmt.run(title.trim(), content.trim(), author.trim(), id)

    if (result.changes === 0) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Get updated post
    const getStmt = db.prepare("SELECT * FROM posts WHERE id = ?")
    const post = getStmt.get(id)

    res.json({
      message: "Post updated successfully",
      post,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete post (admin only)
 */
export function deletePost(req, res, next) {
  try {
    const { id } = req.params

    const stmt = db.prepare("DELETE FROM posts WHERE id = ?")
    const result = stmt.run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json({ message: "Post deleted successfully" })
  } catch (error) {
    next(error)
  }
}
