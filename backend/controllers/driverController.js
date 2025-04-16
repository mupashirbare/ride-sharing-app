// controllers/driverController.js
import DriverProfile from "../models/DriverProfile.js";
import User from "../models/User.js";

//  Register a Driver (with User + DriverProfile)
export const registerDriver = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      licenseNumber,
      vehicleType,
      vehicleModel,
      plateNumber,
      licenseImage,
    } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      name,
      email,
      phone,
      password,
      userType: "driver",
    });
    await newUser.save();

    const driverProfile = new DriverProfile({
      userId: newUser._id,
      licenseNumber,
      vehicleType,
      vehicleModel,
      plateNumber,
      licenseImage,
      isApproved: false,
    });

    await driverProfile.save();

    res.status(201).json({ message: "Driver registered", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get DriverProfile by userId
export const getDriverProfile = async (req, res) => {
  try {
    const profile = await DriverProfile.findOne({ userId: req.params.userId })
    .populate("userId","name phone email")
    if (!profile) return res.status(404).json({ message: "Driver profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Update DriverProfile
export const updateDriverProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const updatedProfile = await DriverProfile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    res.status(200).json({
      message: "Driver profile updated",
      profile: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Approve Driver (Admin only)
export const approveDriver = async (req, res) => {
  try {
    const profile = await DriverProfile.findOneAndUpdate(
      { userId: req.params.userId },
      { isApproved: true },
      { new: true }
    );

    if (!profile) return res.status(404).json({ message: "Driver not found" });

    res.status(200).json({ message: "Driver approved", profile });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
