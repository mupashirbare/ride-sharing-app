// routes/authRoutes.js
import express from "express";
import {
  verifyPhone,
  loginUser,
  googleLogin,
  logoutUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", verifyPhone);        // POST /api/auth/register
router.post("/login", loginUser);             // POST /api/auth/login
router.post("/google-login", googleLogin);  // POST /api/auth/google-login
router.post("/logout", logoutUser); // POST /api/auth/logout

export default router;
