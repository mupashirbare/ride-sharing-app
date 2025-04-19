import Ride from "../models/Ride.js";
import RideRequest from "../models/RideRequest.js";
import User from "../models/User.js";

//  1. Create or Join a Ride (shared logic)
export const createOrJoinRide = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await RideRequest.findById(requestId);

    if (!request || request.status !== "pending") {
      return res.status(404).json({ message: "Invalid or already processed request" });
    }

    // Optional: match by route & time
    let ride = await Ride.findOne({
      pickupLocation: request.pickupLocation,
      dropOffLocation: request.dropOffLocation,
      rideStatus: "in_progress"
    });

    // If no active ride found, create a new one
    if (!ride) {
      const driver = await User.findOne({ userType: "driver", isApproved: true });
      if (!driver) return res.status(400).json({ message: "No available driver found" });

      ride = new Ride({
        driver: driver._id,
        pickupLocation: request.pickupLocation,
        dropOffLocation: request.dropOffLocation,
        rideStatus: "in_progress",
        passengers: []
      });
    }

    // Add the passenger to the ride
    ride.passengers.push({
      passenger: request.passengerId,
      status: "waiting",
      fare: request.price
    });

    await ride.save();

    // Update the ride request status
    request.status = "accepted";
    request.acceptedAt = new Date();
    await request.save();

    res.status(200).json({
      message: "Ride assigned",
      ride
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Get ride by ID
export const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate("driver", "name phone")
      .populate("passengers.passenger", "name phone");

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  3. Get all rides for a driver
export const getDriverRides = async (req, res) => {
  try {
    const rides = await Ride.find({ driver: req.params.driverId })
      .populate("passengers.passenger", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4. Get all rides for a passenger
export const getPassengerRides = async (req, res) => {
  try {
    const rides = await Ride.find({ "passengers.passenger": req.params.passengerId })
      .populate("driver", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
