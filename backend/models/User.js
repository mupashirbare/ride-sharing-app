import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[\d\s-]+$/, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['driver', 'rider', 'admin'],
    default: 'rider'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 v[0] >= -180 && v[0] <= 180 && 
                 v[1] >= -90 && v[1] <= 90;
        },
        message: 'Invalid coordinates'
      }
    }
  },
  profileImage: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalRides: {
    type: Number,
    default: 0
  },
  vehicleInfo: {
    type: {
      model: String,
      color: String,
      plateNumber: String,
      year: Number
    },
    required: function() {
      return this.role === 'driver';
    }
  },
  documents: [{
    type: {
  userType: {
    type: String,
    enum: ["passenger", "driver", "admin"],
    required: true
  },
  profileImage: {
    type: String, // URL to the profile picture
    default: "https://example.com/default-profile.png"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// Automatically hash password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Add a method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
