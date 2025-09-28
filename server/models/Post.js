// Post model for blog management
const pool = require("../config/database")

class Post {
  // Create new post
  static async create(title, content, author) {
    try {
      const query = `
                INSERT INTO posts (title, content, author, created_at, updated_at)
                VALUES ($1, $2, $3, NOW(), NOW())
                RETURNING *
            `

      const result = await pool.query(query, [title, content, author])
      return result.rows[0]
    } catch (error) {
      throw error
    }
  }

  // Get all posts (public)
  static async findAll() {
    try {
      const query = `
                SELECT id, title, content, author, created_at, updated_at
                FROM posts
                ORDER BY created_at DESC
            `

      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw error
    }
  }

  // Get single post by ID
  static async findById(id) {
    try {
      const query = "SELECT * FROM posts WHERE id = $1"
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw error
    }
  }

  // Update post
  static async update(id, title, content, author) {
    try {
      const query = `
                UPDATE posts 
                SET title = $1, content = $2, author = $3, updated_at = NOW()
                WHERE id = $4
                RETURNING *
            `

      const result = await pool.query(query, [title, content, author, id])
      return result.rows[0]
    } catch (error) {
      throw error
    }
  }

  // Delete post
  static async delete(id) {
    try {
      const query = "DELETE FROM posts WHERE id = $1 RETURNING *"
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw error
    }
  }
}

module.exports = Post
