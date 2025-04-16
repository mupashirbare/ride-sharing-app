import express from "express";
import {
  registerDriver,
  getDriverProfile,
  updateDriverProfile,
  approveDriver
} from "../controllers/driverController.js";

const router = express.Router();

// Register a new driver (creates User + DriverProfile)
router.post("/register", registerDriver);

// Get driver profile by user ID
router.get("/profile/:userId", getDriverProfile);

// Update driver profile
router.put("/profile/:userId", updateDriverProfile);

// Approve driver (admin action)
router.patch("/approve/:userId", approveDriver);

export default router;
