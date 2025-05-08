import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
// ✅ Register user via email & password with profile image
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, isAdmin } = req.body;

    if (!email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Handle profile image upload
    const profileImagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    // ✅ Only allow admin creation if current user is an admin
    let allowAdmin = false;

    if (req.user && req.user.isAdmin) {
      allowAdmin = true;
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
      profileImage: profileImagePath,
    // ✅ Secure version:
    isAdmin: req.user?.isAdmin ? (isAdmin === 'true' || isAdmin === true) : false,
      authProvider: "local"
    });

    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ message: "User registered", user: newUser, token });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// ✅ Phone Login (create user if not exists)
export const verifyPhone = async (req, res) => {
  try {
    const phone = req.body.phone?.trim();
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({
        phone,
        name: "New User",
        authProvider: "local"
      });
      await user.save();
    }

    const token = generateToken(user);
    res.status(200).json({ message: "User authenticated", user, token });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Login via email/phone + password (for admin and driver)
export const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { phone: usernameOrEmail }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", user, token });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Google Login
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        phone: "not-set",
        password: "google-auth", // not used
        profileImage: picture,
        authProvider: "google"
      });
      await user.save();
    }

    const token = generateToken(user);
    res.status(200).json({ message: "Google login successful", user, token });

  } catch (err) {
    res.status(500).json({ message: "Google login failed", error: err.message });
  }
};

// ✅ Update user profile
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    if (req.file) {
      updates.profileImage = `/uploads/${req.file.filename}`;
    }

    // Block sensitive fields
    delete updates.password;
    delete updates._id;
    delete updates.isAdmin;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User profile updated",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// ✅ Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get current logged-in user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
};

// ✅ Get user by ID (admin only)
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
};

// ✅ Stateless logout
export const logoutUser = async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};
