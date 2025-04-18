import express from "express";
import {
  createOrJoinRide,
  getRideById,
  getDriverRides,
  getPassengerRides
} from "../controllers/rideController.js";

const router = express.Router();

// Assign a passenger to a ride (new or existing)
router.post("/assign/:requestId",createOrJoinRide);

// Get details of a specific ride
router.get("/:id",  getRideById);

//  Get all rides by driver
router.get("/driver/:driverId", getDriverRides);

//  Get all rides joined by a passenger
router.get("/passenger/:passengerId",getPassengerRides);

export default router;
