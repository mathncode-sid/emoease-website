import express from "express"
import { 
  register, 
  login, 
  getUserSubmissions, 
  updateSubmissionStatus, 
  getSubmissionById 
} from "../controllers/adminController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// POST /api/admin/register - Register new admin
router.post("/register", register)

// POST /api/admin/login - Login admin
router.post("/login", login)

// GET /api/admin/submissions - Get user submissions for review
router.get("/submissions", authenticateToken, getUserSubmissions)

// PUT /api/admin/submissions/:id - Update submission status
router.put("/submissions/:id", authenticateToken, updateSubmissionStatus)

// GET /api/admin/submissions/:id - Get submission details
router.get("/submissions/:id", authenticateToken, getSubmissionById)

export default router
