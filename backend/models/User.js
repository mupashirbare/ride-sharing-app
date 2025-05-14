import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    sparse: true,
    unique: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  profileImage: {
    type: String, // URL to the profile picture
    default: "https://example.com/default-profile.png"
  },
  userType: {
    type: String,
    enum:["passenger","driver","admin"],
    default: "passenger" // ✅ becomes true only if promoted manually
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Automatically hash password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
