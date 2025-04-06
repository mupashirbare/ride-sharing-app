import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ 1. Passenger Login or Create via Phone Number
export const verifyPhone = async (req, res) => {
  try {
    const phone = req.body.phone?.trim();
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    let user = await User.findOne({ phone, userType: "passenger" });

    if (!user) {
      user = new User({
        phone,
        userType: "passenger",
        name: "New Passenger"
      });
      await user.save();
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Passenger authenticated",
      user,
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ 2. Register Driver or Admin
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      phone,
      password,
      userType, // driver or admin
      licenseNumber,
      vehicleType,
      vehicleModel,
      plateNumber
    } = req.body;

    if (userType === "passenger") {
      return res.status(400).json({ message: "Passengers use phone login only" });
    }

    const existing = await User.findOne({
      $or: [{ email }, { username }, { phone }]
    });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      userType
    };

    // Add driver-specific fields
    if (userType === "driver") {
      Object.assign(userData, {
        licenseNumber,
        vehicleType,
        vehicleModel,
        plateNumber,
        isApproved: false
      });
    }

    const newUser = new User(userData);
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ 3. Login Driver or Admin
export const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.userType === "passenger") {
      return res.status(400).json({ message: "Passengers use phone login only" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.userType === "driver" && !user.isApproved) {
      return res.status(403).json({ message: "Driver not approved yet" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      user,
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
// ✅ Update user profile (name, email, etc.)
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Prevent changing critical fields
    delete updates.userType;
    delete updates.password;
    delete updates._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// ✅ Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

