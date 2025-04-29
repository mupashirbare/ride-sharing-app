import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const clients = new Map();

const verifyClient = async (info, callback) => {
    try {
        const token = info.req.url.split('token=')[1];
        if (!token) {
            callback(false, 401, 'Unauthorized');
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user || user.status === 'suspended') {
            callback(false, 401, 'Unauthorized');
            return;
        }

        info.req.user = user;
        callback(true);
    } catch (error) {
        callback(false, 401, 'Unauthorized');
    }
};

export const createWebSocketServer = (server) => {
    const wss = new WebSocketServer({ 
        server,
        verifyClient
    });

    wss.on('connection', (ws, req) => {
        const userId = req.user._id.toString();
        clients.set(userId, ws);

        console.log(`Client connected: ${userId}`);

        ws.on('message', async (message) => {
            try {
                const data = JSON.parse(message);
                
                switch (data.type) {
                    case 'location_update':
                        handleLocationUpdate(userId, data.payload);
                        break;
                    case 'ride_request':
                        handleRideRequest(userId, data.payload);
                        break;
                    case 'ride_status_update':
                        handleRideStatusUpdate(userId, data.payload);
                        break;
                    default:
                        console.log('Unknown message type:', data.type);
                }
            } catch (error) {
                console.error('Error handling message:', error);
                ws.send(JSON.stringify({
                    type: 'error',
                    payload: 'Invalid message format'
                }));
            }
        });

        ws.on('close', () => {
            clients.delete(userId);
            console.log(`Client disconnected: ${userId}`);
        });

        // Send initial connection success message
        ws.send(JSON.stringify({
            type: 'connection_established',
            payload: {
                userId: userId,
                timestamp: new Date()
            }
        }));
    });

    return wss;
};

const handleLocationUpdate = async (userId, payload) => {
    try {
        const { latitude, longitude } = payload;
        
        // Update user location in database
        await User.findByIdAndUpdate(userId, {
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });

        // If user is a driver and is on an active ride, notify the rider
        const user = await User.findById(userId);
        if (user.role === 'driver') {
            // TODO: Implement rider notification logic
        }
    } catch (error) {
        console.error('Error handling location update:', error);
    }
};

const handleRideRequest = async (userId, payload) => {
    try {
        const { pickup, destination } = payload;
        
        // Find nearby drivers
        const nearbyDrivers = await User.find({
            role: 'driver',
            status: 'active',
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [pickup.longitude, pickup.latitude]
                    },
                    $maxDistance: 5000 // 5km
                }
            }
        });

        // Notify nearby drivers
        nearbyDrivers.forEach(driver => {
            const driverWs = clients.get(driver._id.toString());
            if (driverWs) {
                driverWs.send(JSON.stringify({
                    type: 'new_ride_request',
                    payload: {
                        requestId: userId,
                        pickup,
                        destination
                    }
                }));
            }
        });
    } catch (error) {
        console.error('Error handling ride request:', error);
    }
};

const handleRideStatusUpdate = async (userId, payload) => {
    try {
        const { rideId, status } = payload;
        
        // Update ride status in database
        const ride = await Ride.findByIdAndUpdate(
            rideId,
            { status },
            { new: true }
        );

        // Notify relevant parties
        [ride.rider.toString(), ride.driver.toString()].forEach(id => {
            const ws = clients.get(id);
            if (ws) {
                ws.send(JSON.stringify({
                    type: 'ride_status_update',
                    payload: {
                        rideId,
                        status,
                        timestamp: new Date()
                    }
                }));
            }
        });
    } catch (error) {
        console.error('Error handling ride status update:', error);
    }
}; 