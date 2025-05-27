import express from "express";
import upload from "../middleware/uploadMiddleware.js"; // multer middleware
import isAdmin from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js"; 
import {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser, 
  sendOtp,
  verifyOtp,
} from "../controllers/userController.js";
const router = express.Router();

// ✅ Public registration & login
router.post("/register",protect, upload.single("profileImage"), registerUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);

// ✅ OAuth
router.post("/google-login", googleLogin);
// router.post("/facebook-login", facebookLogin); // if used

// ✅ Admin-only user creation
router.post("/admin-register", protect, isAdmin, upload.single("profileImage"), registerUser);

// ✅ Logout
router.post("/logout", logoutUser);

export default router;
