import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import driverRoutes from './routes/driverRoutes.js'
import RideRequestRoutes from './routes/RideRequestRoutes.js'
import authRoutes from './routes/authRoutes.js'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

// Middleware imports
import { errorHandler } from './middleware/errorHandler.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// General middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// Static files
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use('/api/driver', authenticate, driverRoutes);
app.use('/api/rides', authenticate, RideRequestRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ride_sharing_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Models
const User = mongoose.model('User', {
    name: String,
    email: String,
    phone: String,
    role: { type: String, enum: ['driver', 'rider'] },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
});

const Ride = mongoose.model('Ride', {
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickup: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
    destination: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
    status: { type: String, enum: ['requested', 'accepted', 'started', 'completed', 'cancelled'] },
    createdAt: { type: Date, default: Date.now },
});

// Routes
app.post('/api/rides', async (req, res) => {
    try {
        const { riderId, pickup, destination } = req.body;
        const ride = new Ride({
            rider: riderId,
            pickup: {
                type: 'Point',
                coordinates: pickup,
            },
            destination: {
                type: 'Point',
                coordinates: destination,
            },
            status: 'requested',
        });
        await ride.save();
        res.json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/drivers/nearby', async (req, res) => {
    try {
        const { latitude, longitude, radius = 5000 } = req.query;
        const drivers = await User.find({
            role: 'driver',
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: radius,
                },
            },
        });
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/rides/:rideId/status', async (req, res) => {
    try {
        const { rideId } = req.params;
        const { status, driverId } = req.body;
        const ride = await Ride.findByIdAndUpdate(
            rideId,
            { status, driver: driverId },
            { new: true }
        );
        res.json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// WebSocket setup for real-time features
import { createWebSocketServer } from './websocket/index.js';
createWebSocketServer(server);

export default app;
