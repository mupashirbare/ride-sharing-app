import express from "express";
import {
  registerDriver,
  getDriverProfile,
  updateDriverProfile,
  approveDriver
} from "../controllers/driverController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Accept image in register
router.post(
  "/register",
  upload.fields([
    { name: "licenseImage", maxCount: 1 },
    { name: "profileImage", maxCount: 1 }
  ]),
  registerDriver
);

// Get driver profile by user ID
router.get("/profile/:userId", getDriverProfile);

// Update driver profile
router.put("/profile/:userId", updateDriverProfile);

// Approve driver (admin action)
router.patch("/approve/:userId", approveDriver);

export default router;
