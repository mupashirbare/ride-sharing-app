import express from "express";
import {
  verifyPhone,
  loginUser,
  updateUser,
  deleteUser,
  googleLogin
} from "../controllers/userController.js";

const router = express.Router();

// Passenger login via phone number
router.post("/verify-phone", verifyPhone);

// Driver/Admin login
router.post("/login", loginUser);

// Update general user info (name, email, etc.)
router.put("/update/:id", updateUser);
router.post("/google-login", googleLogin);

// Delete user by ID
router.delete("/delete/:id", deleteUser);

export default router;
