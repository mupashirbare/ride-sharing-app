import express from "express";
import {
  verifyPhone,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

//Passenger Login (Phone-only)
router.post("/verify-phone", verifyPhone);

// Driver/Admin Register
router.post("/register", registerUser);

//  Driver/Admin Login
router.post("/login", loginUser);

//  Update User Profile
router.put("/update/:id", updateUser);

// Delete User
router.delete("/delete/:id", deleteUser);

export default router;
