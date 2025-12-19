
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.method === "OPTIONS") {
        next();
        return;
    }

    try {
        
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            res.status(401).json({ message: "Not authorized" });
            return; 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        
        req.user = decoded;
        
        next(); 
    } catch (e) {
        res.status(401).json({ message: "Not authorized" });
    }
};