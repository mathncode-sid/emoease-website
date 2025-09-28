// Post routes for blog management
const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")
const { authenticateToken } = require("../middleware/auth")

// Public routes
router.get("/", postController.getAllPosts) // GET /api/posts
router.get("/:id", postController.getPostById) // GET /api/posts/:id

// Protected routes (Admin only)
router.post("/", authenticateToken, postController.createPost) // POST /api/posts
router.put("/:id", authenticateToken, postController.updatePost) // PUT /api/posts/:id
router.delete("/:id", authenticateToken, postController.deletePost) // DELETE /api/posts/:id

module.exports = router
