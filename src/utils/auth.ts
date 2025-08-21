import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Secret key used to sign and verify JWT tokens.
// It is retrieved from environment variables or falls back to a default value.
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * Extended Request interface to include a `user` property
 * that will hold the decoded JWT payload.
 */
export interface AuthRequest extends Request {
    user?: any;
}

/**
 * Authentication middleware for Express that verifies the presence and validity
 * of a JWT token in the Authorization header.
 *
 * - Checks that the 'Authorization' header exists and follows the format 'Bearer <token>'.
 * - Verifies and decodes the token using the secret key.
 * - If valid, attaches the decoded payload to `req.user`.
 * - If missing or invalid, responds with 401 Unauthorized.
 *
 * @param req - Express request object extended with `user` property.
 * @param res - Express response object.
 * @param next - Next middleware function.
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Initial check for the Authorization header format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token not provided' });
        return;
    }

    // Extract the token string from the header
    const token = authHeader.split(' ')[1];

    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach the decoded token payload to the request object
        req.user = decoded;
        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Token is invalid or expired — respond with 401 Unauthorized
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
};
