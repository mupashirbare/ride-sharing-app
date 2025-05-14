import mongoose from "mongoose";
import DriverProfile from "../models/DriverProfile.js";
import User from "../models/User.js";

// ✅ Register Driver Profile (user becomes a driver here)
export const registerDriver = async (req, res) => {
  try {
    const {vehicleType, vehicleModel, plateNumber } = req.body;
    // console.log(userId)
    console.log("User:", req.user);

    const currentUser=req.user;
    // console.log(currentUser)

    if (!mongoose.Types.ObjectId.isValid(currentUser._id)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // const files = req.files;
    // const licenseImagePath = files?.licenseImage
    //   ? `/uploads/${files.licenseImage[0].filename}`
    //   : null;

    const user = await User.findById(currentUser._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userType === 'driver') {
      return res.status(400).json({ message: 'User is already a driver' });
    }

    const existingProfile = await DriverProfile.findOne({ userId: user._id });
    if (existingProfile) {
      return res.status(400).json({ message: "Driver profile already exists" });
    }

    const driverProfile = new DriverProfile({
      userId: user._id,
      vehicleType,
      vehicleModel,
      plateNumber,
      // licenseImage: licenseImagePath
    });

    await driverProfile.save();

    user.userType = 'driver';
    await user.save();

    const populatedProfile = await driverProfile.populate("userId", "name email phone");

    res.status(201).json({
      message: "Driver profile created",
      profile: populatedProfile
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
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

// ✅ Admin Approves Driver
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
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverProfile.find()
      .populate("userId", "name email phone  profileImage");

    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drivers", error: err.message });
  }
};
export const getDriversByStatus = async (req, res) => {
  try {
    const { approved } = req.query;

    const filter = {};
    if (approved === "true") filter.isApproved = true;
    else if (approved === "false") filter.isApproved = false;

    const drivers = await DriverProfile.find(filter)
      .populate("userId", "name email phone profileImage");

    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};


