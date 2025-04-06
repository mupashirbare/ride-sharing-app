import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Basic Info for All Users
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },

  // Role: passenger, driver, admin
  userType: {
    type: String,
    enum: ["passenger", "driver", "admin"],
    required: true
  },

  // Driver-Specific Info (optional for others)
  isApproved: {
    type: Boolean,
    default: false
  },
  licenseNumber: {
    type: String,
    default: null
  },
  vehicleType: {
    type: String,
    default: null
  },
  vehicleModel: {
    type: String,
    default: null
  },
  plateNumber: {
    type: String,
    default: null
  },
  licenseImage: {
    type: String, // URL or file path
    default: null
  },

  // Admin-only and general fields
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
export default User;
