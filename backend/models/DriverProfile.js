import mongoose from "mongoose";

const driverProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false
  },
  licenseNumber: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleModel: {
    type: String,
    required: true
  },
  plateNumber: {
    type: String,
    required: true
  },
  licenseImage: {
    type: String,
    required: true
  }
});

const DriverProfile = mongoose.model("DriverProfile", driverProfileSchema);
export default DriverProfile;
