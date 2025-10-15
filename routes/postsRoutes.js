import express from "express"
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getAllPosts)
router.get("/:id", getPostById)

// Protected routes (require authentication)
router.post("/", authenticateToken, createPost)
router.put("/:id", authenticateToken, updatePost)
router.delete("/:id", authenticateToken, deletePost)

export default router
