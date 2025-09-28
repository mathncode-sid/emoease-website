// Admin model for database operations
const pool = require("../config/database")
const bcrypt = require("bcrypt")

class Admin {
  // Create new admin
  static async create(email, password, name) {
    try {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const query = `
                INSERT INTO admins (email, password_hash, name, created_at, updated_at)
                VALUES ($1, $2, $3, NOW(), NOW())
                RETURNING id, email, name, created_at
            `

      const result = await pool.query(query, [email, passwordHash, name])
      return result.rows[0]
    } catch (error) {
      throw error
    }
  }

  // Find admin by email
  static async findByEmail(email) {
    try {
      const query = "SELECT * FROM admins WHERE email = $1"
      const result = await pool.query(query, [email])
      return result.rows[0]
    } catch (error) {
      throw error
    }
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  // Find admin by ID
  static async findById(id) {
    try {
      const query = "SELECT id, email, name, created_at FROM admins WHERE id = $1"
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw error
    }
  }
}

module.exports = Admin
