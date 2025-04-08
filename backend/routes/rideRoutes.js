import express from "express";
import { createRideRequest } from "../controllers/rideController.js";

const routers = express.Router();

routers.post("/request", createRideRequest); // Only passengers

export default routers;
