import express from "express"
import {
  registerUser,
  loginUser,
  getUserProfile,
  submitPost,
  getUserPosts,
  updateUserPost,
  deleteUserPost
} from "../controllers/userController.js"
import { authenticateUser } from "../middleware/userAuth.js"

const router = express.Router()

// Public routes (no authentication required)
router.post("/register", registerUser)
router.post("/login", loginUser)

// Protected routes (authentication required)
router.get("/profile", authenticateUser, getUserProfile)
router.post("/posts", authenticateUser, submitPost)
router.get("/posts", authenticateUser, getUserPosts)
router.put("/posts/:id", authenticateUser, updateUserPost)
router.delete("/posts/:id", authenticateUser, deleteUserPost)

export default router