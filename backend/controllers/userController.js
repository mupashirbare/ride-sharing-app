import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Passenger Login via Phone
export const verifyPhone = async (req, res) => {
  try {
    const phone = req.body.phone?.trim();
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    let user = await User.findOne({ phone, userType: "passenger" });

    if (!user) {
      user = new User({
        phone,
        userType: "passenger",
        name: "New Passenger",
        authProvider: "local"
      });
      await user.save();
    }

    const token = generateToken(user);
    res.status(200).json({ message: "Passenger authenticated", user, token });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Admin or Driver Login
export const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { phone: usernameOrEmail }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.userType === "passenger") {
      return res.status(400).json({ message: "Passengers use phone login only" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", user, token });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Google Login (new)
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
        password: "google-auth", // dummy
        userType: "passenger",   // or ask role selection later
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
//update user
export const updateUser = async (req, res) => {
  try {
    console.log("🔐 req.user:", req.user);
    const userId = req.user.id;
    const updates = req.body;

    // Handle image upload
    if (req.file) {
      updates.profileImage = `/uploads/${req.file.filename}`;
    }

    // Prevent restricted updates
    delete updates.userType;
    delete updates.password;
    delete updates._id;

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

// get All users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
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
// GET /me
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
};

// GET /:id (admin)
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
};
// userController.js
export const logoutUser = async (req, res) => {
  // No need to do anything to the token since JWT is stateless
  res.status(200).json({ message: "User logged out successfully" });
};


