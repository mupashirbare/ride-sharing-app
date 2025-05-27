import jwt from "jsonwebtoken";
import axios from "axios";
import otpGenerator from "otp-generator";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();
const client = new OAuth2Client("1098662333780-1oeod80vohslosm8048amqomfmiabeah.apps.googleusercontent.com");

// ✅ Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const SMS_USER = process.env.SMS_USER;
const SMS_PASS = process.env.SMS_PASS;
export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number is required" });
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await User.updateOne(
    { phone },
    { phone, otp, otpExpires: Date.now() + 5 * 60 * 1000 },
    { upsert: true }
  );

  const message = `Codsigaaga SafarX OTP: ${otp}`;
  const smsUrl = `https://tabaarakict.so/SendSMS.aspx?user=${SMS_USER}&pass=${SMS_PASS}&cont=${encodeURIComponent(message)}&rec=${phone}`;

  try {
    await axios.get(smsUrl);
    return res.json({ success: true, sent: true, phone });
  } catch (err) {
    return res.status(500).json({ error: "SMS sending failed", details: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });
  if (!user || user.otp !== otp || Date.now() > user.otpExpires)
    return res.status(400).json({ error: "OTP invalid or expired" });

  user.otp = null; user.otpExpires = null; await user.save();

  const token = generateToken(user);
  res.json({ verified: true, token, user });
};

// ✅ Register user via email & password with profile image
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, password, isAdmin } = req.body;

//     if (!email || !password || !phone) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existing = await User.findOne({ $or: [{ email }, { phone }] });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // ✅ Handle profile image upload
//     const profileImagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

//     // ✅ Only allow admin creation if current user is an admin
//     let allowAdmin = false;

//     if (req.user && req.user.isAdmin) {
//       allowAdmin = true;
//     }

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       password,
//       profileImage: profileImagePath,
//     // ✅ Secure version:
//     // isAdmin: req.user?.isAdmin ? (isAdmin === 'true' || isAdmin === true) : false,
//       // Allow setting admin freely (⚠️ Only for development or manual admin creation)
//       isAdmin: isAdmin === 'true' || isAdmin === true,
//       authProvider: "local"
//     });

//     await newUser.save();

//     const token = generateToken(newUser);
//     res.status(201).json({ message: "User registered", user: newUser, token });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };
export const registerUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, profileImage } = req.body;
    // ✅ Handle optional profile image upload
    const profileImagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.status(200).json({ message: "User updated", user });
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

// // ✅ Google Login
// export const googleLogin = async (req, res) => {
//   try {
//     const { idToken } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { name, email,password, picture } = payload;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//          name,
//           email,
//           password,
//           profileImage: picture });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Invalid Google Token" });
//   }
// };
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        profileImage: picture,
        authProvider: "google"
      });
    }

    const token = generateToken(user); // use your helper function
    res.status(200).json({ token, user });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Google Token" });
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
