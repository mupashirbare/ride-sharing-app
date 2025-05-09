// import mongoose from "mongoose";

// const rideRequestSchema = new mongoose.Schema({
//   passengerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   pickupLocation: {
//     type: String,
//     required: true
//   },
//   dropOffLocation: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ["pending", "accepted", "cancelled", "completed"],
//     default: "pending"
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   requestedAt: {
//     type: Date,
//     default: Date.now
//   },
//   acceptedAt: {
//     type: Date
//   }
// });

// const RideRequest = mongoose.model("RideRequest", rideRequestSchema);
// export default RideRequest;

// models/RequestRide.js

import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const rideRequestSchema = new mongoose.Schema({
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pickup: {
    type: locationSchema,
    required: true,
  },
  dropOff: {
    type: locationSchema,
    required: true,
  },
  requestedTime: {
    type: Date,
    default: Date.now,
  },
  fare: {
    type: Number,
    required: false, // not required if fare is estimated later
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled", "expired"],
    default: "pending",
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  acceptedAt: {
    type: Date,
    default: null,
  }
  
});

export default mongoose.model("RideRequest", rideRequestSchema);

