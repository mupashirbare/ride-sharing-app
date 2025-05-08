import mongoose from "mongoose";
import DriverProfile from "../models/DriverProfile.js";
import User from "../models/User.js";

// ✅ Register Driver Profile (for existing driver user)
export const registerDriver = async (req, res) => {
  try {
    const {
      userId,
      vehicleType,
      vehicleModel,
      plateNumber,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const files = req.files;

    const licenseImagePath = files?.licenseImage
      ? `/uploads/${files.licenseImage[0].filename}`
      : null;

    const user = await User.findById(userId);
    if (!user || user.userType !== "driver") {
      return res.status(400).json({ message: "User not found or not a driver" });
    }

    const existingProfile = await DriverProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Driver profile already exists" });
    }

    const driverProfile = new DriverProfile({
      userId,
      vehicleType,
      vehicleModel,
      plateNumber,
      licenseImage: licenseImagePath
    });

    await driverProfile.save();

    const populatedProfile = await driverProfile.populate("userId", "name email phone");

    res.status(201).json({
      message: "Driver profile created",
      profile: populatedProfile
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
      stack: err.stack // Remove in production
    });
  }
};

// ✅ Get Driver Profile by userId
export const getDriverProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const profile = await DriverProfile.findOne({ userId }).populate("userId", "name phone email");

    if (!profile) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Update Driver Profile
export const updateDriverProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (req.file) {
      updates.licenseImage = `/uploads/${req.file.filename}`;
    }

    const updatedProfile = await DriverProfile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    ).populate("userId", "name phone email");

    if (!updatedProfile) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    res.status(200).json({
      message: "Driver profile updated",
      profile: updatedProfile
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Approve Driver (Admin only)
export const approveDriver = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const profile = await DriverProfile.findOneAndUpdate(
      { userId },
      { isApproved: true },
      { new: true }
    ).populate("userId", "name phone email");

    if (!profile) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver approved", profile });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
