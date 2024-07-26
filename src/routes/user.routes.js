import { Router } from "express"
import { getProfile, loginUser, logout, refreshAccessToken, registerUser, ordersHistory } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// private routes
router.route("/logout").post(verifyJWT,logout)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/profile").get(verifyJWT, getProfile)
router.route("/order").post(verifyJWT, ordersHistory)


export default router