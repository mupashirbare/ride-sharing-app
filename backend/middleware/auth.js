import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.js';
import { AppError } from './errorHandler.js';

export const authenticate = async (req, res, next) => {
    try {
        // 1) Check if token exists
        let token;
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }

        // 2) Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        // 4) Check if user changed password after the token was issued
        if (user.passwordChangedAfter && user.passwordChangedAfter(decoded.iat)) {
            return next(new AppError('User recently changed password! Please log in again.', 401));
        }

        // 5) Check if user is active
        if (user.status === 'suspended') {
            return next(new AppError('Your account has been suspended. Please contact support.', 403));
        }

        // Grant access to protected route
        req.user = user;
        next();
    } catch (error) {
        next(new AppError('Authentication failed', 401));
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

export const isVerified = (req, res, next) => {
    if (!req.user.isVerified) {
        return next(new AppError('Please verify your account to access this feature', 403));
    }
    next();
}; 