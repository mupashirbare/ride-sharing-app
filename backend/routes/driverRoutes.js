import express from "express";
import {
  registerDriver,
  getDriverProfile,
  updateDriverProfile,
  approveDriver,
  getAllDrivers,
  getDriversByStatus
} from "../controllers/driverController.js";

import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ Register driver (authenticated users only)
router.post(
  "/register",
  upload.fields([
    { name: "licenseImage", maxCount: 1 } // ✅ Only this is needed
  ]),
  protect,
  registerDriver
);

// ✅ Get driver profile by user ID (protected)
router.get("/profile/:userId", protect, getDriverProfile);

// ✅ Update driver profile (protected)
router.put(
  "/profile/:userId",
  protect,
  upload.single("licenseImage"), // optional update
  updateDriverProfile
);

// ✅ Admin approves driver
router.patch("/approve/:userId", protect, isAdmin, approveDriver);
router.get("/all", getAllDrivers); // GET /api/drivers/all
 router.get("/", getDriversByStatus); // GET /api/drivers?approved=true|false
export default router;
