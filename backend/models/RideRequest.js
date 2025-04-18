import mongoose from "mongoose";

const rideRequestSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropOffLocation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled", "completed"],
    default: "pending"
  },
  price: {
    type: Number,
    required: true
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  acceptedAt: {
    type: Date
  }
});

const RideRequest = mongoose.model("RideRequest", rideRequestSchema);
export default RideRequest;
