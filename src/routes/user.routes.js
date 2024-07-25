import { Router } from "express"
import { loginUser, logout, refreshAccessToken, registerUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// private routes
router.route("/logout").post(verifyJWT,logout)
router.route("/refresh-token").post(refreshAccessToken)


export default router