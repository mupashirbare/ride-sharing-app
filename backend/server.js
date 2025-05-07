import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import driverRoutes from './routes/driverRoutes.js'
import RideRequestRoutes from './routes/RideRequestRoutes.js'
import authRoutes from './routes/authRoutes.js'
import otpRoutes from './routes/twilioRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/api/otp', otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/driver',driverRoutes);
app.use('/api/rides', RideRequestRoutes); // Add this line


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is run on port number  ${PORT}`));
