// import express from "express";
// import {
//   createOrJoinRide,
//   getRideById,
//   getDriverRides,
//   getPassengerRides
// } from "../controllers/rideController.js";

// const router = express.Router();

// // Assign a passenger to a ride (new or existing)
// router.post("/assign/:requestId",createOrJoinRide);

// // Get details of a specific ride
// router.get("/:id",  getRideById);

// //  Get all rides by driver
// router.get("/driver/:driverId", getDriverRides);

// //  Get all rides joined by a passenger
// router.get("/passenger/:passengerId",getPassengerRides);

// export default router;
// =========================

import express from "express";
import { createRideRequest, getMyRequests,acceptRide } from "../controllers/RideRequestController.js";
import protect from "../middleware/authMiddleware.js"; // JWT middleware

const router = express.Router();

// Passenger creates a ride request
router.post("/request", protect, createRideRequest);
router.post("/accept", protect, acceptRide);

// Passenger views their ride requests
router.get("/my-requests", protect, getMyRequests);


export default router;
