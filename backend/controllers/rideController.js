import RideRequest from "../models/RideRequest.js";
import User from "../models/User.js";

// Create a new ride request (Passenger only)
export const createRideRequest = async (req, res) => {
  try {
    const { passengerId, pickupLocation, dropOffLocation, price } = req.body;

    // Validate passenger user
    const user = await User.findById(passengerId);
    if (!user || user.userType !== "passenger") {
      return res.status(403).json({ message: "Only passengers can request rides" });
    }

    const ride = new RideRequest({
      passengerId,
      pickupLocation,
      dropOffLocation,
      price
    });

    await ride.save();

    res.status(201).json({
      message: "Ride request created successfully",
      ride
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
