import express from "express";
import { createRideRequest,editRideRequest,cancelRideRequest } from "../controllers/rideController.js";

const routers = express.Router();

routers.post("/request", createRideRequest); // Only passengers
routers.put("/request/:rideId", editRideRequest); // Edit ride (pickup/drop only)
routers.delete("/request/:rideId", cancelRideRequest); // Cancel ride

export default routers;
