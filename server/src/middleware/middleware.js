import jwt from 'jsonwebtoken';
import statusCodes from "http-status-codes";

export function requireAdmin(req, res, next) {
    console.log("middleware reached");
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