import express from "express";
import {
  verifyPhone,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

// ✅ 1. Import the protect middleware
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public Routes
router.post("/verify-phone", verifyPhone); // Passenger login
router.post("/register", registerUser);    // Driver/Admin register
router.post("/login", loginUser);          // Driver/Admin login

// ✅ Protected Routes
router.put("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);

export default router;
