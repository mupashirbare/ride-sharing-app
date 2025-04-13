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

// Edit ride request (pickup/drop only)
export const editRideRequest = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { passengerId, pickupLocation, dropOffLocation } = req.body;

    const ride = await RideRequest.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride request not found" });

    if (ride.passengerId.toString() !== passengerId) {
      return res.status(403).json({ message: "You can only edit your own ride request" });
    }

    if (ride.status !== "pending") {
      return res.status(400).json({ message: "Only pending ride requests can be edited" });
    }

    // Update only allowed fields
    ride.pickupLocation = pickupLocation;
    ride.dropOffLocation = dropOffLocation;

    await ride.save();
    res.status(200).json({ message: "Ride request updated successfully", ride });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Cancel ride request
export const cancelRideRequest = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { passengerId } = req.body;

    const ride = await RideRequest.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride request not found" });

    if (ride.passengerId.toString() !== passengerId) {
      return res.status(403).json({ message: "You can only cancel your own ride request" });
    }

    if (ride.status !== "pending") {
      return res.status(400).json({ message: "Only pending ride requests can be cancelled" });
    }

    ride.status = "cancelled";
    await ride.save();

    res.status(200).json({ message: "Ride request cancelled successfully", ride });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};