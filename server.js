import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { initDatabase } from "./config/db.js"
import adminRoutes from "./routes/adminRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

// Load environment variables
dotenv.config()

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3000

// Initialize database
initDatabase()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")))

// API Routes
app.use("/api/admin", adminRoutes)
app.use("/api/posts", postRoutes)

// Root route - serve main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 Men's Mental Health Blog API ready`)
})
