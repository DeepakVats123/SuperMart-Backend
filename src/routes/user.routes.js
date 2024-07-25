import { Router } from "express"
import { loginUser, logout, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// private routes
router.route("/logout").post(verifyJWT, logout)


export default router