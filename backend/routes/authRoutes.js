import express from "express";
import upload from "../middleware/uploadMiddleware.js"; // multer middleware
import isAdmin from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js"; 
import {
  registerUser,
  verifyPhone,
  loginUser,
  googleLogin,
  logoutUser, 

} from "../controllers/userController.js";

const router = express.Router();

// ✅ Public registration & login
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/verify-phone", verifyPhone);
router.post("/login", loginUser);

// ✅ OAuth
router.post("/google-login", googleLogin);
// router.post("/facebook-login", facebookLogin); // if used

// ✅ Admin-only user creation
router.post("/admin-register", protect, isAdmin, upload.single("profileImage"), registerUser);

// ✅ Logout
router.post("/logout", logoutUser);

export default router;
