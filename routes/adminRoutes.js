import express from "express"
import { register, login } from "../controllers/adminController.js"

const router = express.Router()

// POST /api/admin/register - Register new admin
router.post("/register", register)

// POST /api/admin/login - Login admin
router.post("/login", login)

export default router
