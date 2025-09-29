// Server entry point
// This file starts the Express server and serves static files

const express = require("express")
const path = require("path")
const app = require("./app")

// Serve static files from the public directory
const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath))

// Serve admin static files
app.use("/admin", express.static(path.join(publicPath, "admin")))

// Fallback to index.html for client-side routing
app.get("*", (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api/")) {
    return next()
  }

  // Serve the appropriate HTML file
  if (req.path.startsWith("/admin")) {
    res.sendFile(path.join(publicPath, "admin", "login.html"))
  } else {
    res.sendFile(path.join(publicPath, "index.html"))
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("=".repeat(50))
  console.log(`🚀 EmoEase Server Started`)
  console.log("=".repeat(50))
  console.log(`📍 Server URL: http://localhost:${PORT}`)
  console.log(`🌐 Public Site: http://localhost:${PORT}`)
  console.log(`🔐 Admin Panel: http://localhost:${PORT}/admin/login.html`)
  console.log(`📊 Health Check: http://localhost:${PORT}/health`)
  console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`)
  console.log("=".repeat(50))
})

module.exports = app
