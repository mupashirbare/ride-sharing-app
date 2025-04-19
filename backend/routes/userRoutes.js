// routes/userRoutes.js
import express from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getMe,
  getUserById
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe); // GET /api/users/me
router.put("/update-profile", protect, upload.single("profileImage"), updateUser); // PUT /api/users/update-profile

// Admin-only routes
router.get("/", protect, isAdmin, getAllUsers);     // GET /api/users
router.get("/:id", protect, isAdmin, getUserById);  // GET /api/users/:id
router.delete("/:id", protect, isAdmin, deleteUser);// DELETE /api/users/:id

export default router;
