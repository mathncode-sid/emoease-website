import db from "./config/db.js"
import bcrypt from "bcryptjs"

// Add test user
const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123"
}

// Hash password
const hashedPassword = await bcrypt.hash(testUser.password, 10)

// Insert test user
const insertUser = db.prepare(`
  INSERT OR REPLACE INTO users (name, email, password) 
  VALUES (?, ?, ?)
`)

const userResult = insertUser.run(testUser.name, testUser.email, hashedPassword)
console.log(`✅ Test user created with ID: ${userResult.lastInsertRowid}`)

// Add test admin
const testAdmin = {
  email: "admin@example.com", 
  password: "admin123"
}

const hashedAdminPassword = await bcrypt.hash(testAdmin.password, 10)

const insertAdmin = db.prepare(`
  INSERT OR REPLACE INTO admins (email, password) 
  VALUES (?, ?)
`)

const adminResult = insertAdmin.run(testAdmin.email, hashedAdminPassword)
console.log(`✅ Test admin created with ID: ${adminResult.lastInsertRowid}`)

// Add some test posts
const testPosts = [
  {
    title: "My Mental Health Journey",
    content: "This is my story about overcoming mental health challenges and finding hope...",
    excerpt: "This is my story about overcoming mental health challenges...",
    category: "personal-story",
    tags: JSON.stringify(["mental-health", "personal", "journey"]),
    author: testUser.name,
    user_id: userResult.lastInsertRowid,
    status: "pending"
  },
  {
    title: "Tips for Managing Anxiety",
    content: "Here are some practical tips that have helped me manage anxiety in daily life...",
    excerpt: "Here are some practical tips that have helped me manage anxiety...",
    category: "tips-advice", 
    tags: JSON.stringify(["anxiety", "tips", "self-care"]),
    author: testUser.name,
    user_id: userResult.lastInsertRowid,
    status: "approved"
  }
]

const insertPost = db.prepare(`
  INSERT INTO user_posts (title, content, excerpt, category, tags, author, user_id, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`)

testPosts.forEach(post => {
  const result = insertPost.run(
    post.title, post.content, post.excerpt, post.category, 
    post.tags, post.author, post.user_id, post.status
  )
  console.log(`✅ Test post created with ID: ${result.lastInsertRowid}`)
})

console.log(`
✅ Test data added successfully!

User Login:
  Email: ${testUser.email}
  Password: ${testUser.password}

Admin Login:  
  Email: ${testAdmin.email}
  Password: ${testAdmin.password}
`)

process.exit(0)