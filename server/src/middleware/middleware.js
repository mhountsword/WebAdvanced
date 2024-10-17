import jwt from 'jsonwebtoken';
import statusCodes from "http-status-codes";

export function requireAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secret-key');
        if (decoded.userRole === 'admin') {
            next();
        } else {
            return res.status(statusCodes.FORBIDDEN).json({ message: 'Forbidden' });
        }
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
}

export function isLoggedIn(req, res, next) {
    // Check if req and req.headers are defined
    if (!req || !req.headers) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: 'Bad Request: No request headers available.' });
    }

    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token

    try {
        req.user = jwt.verify(token, 'secret-key');
        next(); // Call the next middleware
    } catch (error) {
        console.log(error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token expired' });
        } else {
            return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Unauthorized or invalid token' });
        }
    }
}

