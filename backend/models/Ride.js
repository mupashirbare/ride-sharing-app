import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  passengers: [
    {
      passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      status: {
        type: String,
        enum: ["waiting", "picked_up", "completed"],
        default: "waiting"
      },
      fare: {
        type: Number,
        required: true
      }
    }
  ],

  pickupLocation: {
    type: String,
    required: true
  },

  dropOffLocation: {
    type: String,
    required: true
  },

  routeDistance: {
    type: Number, // in kilometers
    default: 0
  },

  rideStatus: {
    type: String,
    enum: ["pending", "in_progress", "completed", "cancelled"],
    default: "pending"
  },

  startTime: {
    type: Date
  },

  endTime: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
