import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    id?: string | JwtPayload;
}

 const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction):any => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if(!decoded){
            return res.status(401).json({
                message: "Unauthorized", 
                success: false
            });
        }

        if (typeof decoded !== 'string' && 'id' in decoded) {
            req.id = decoded.id;
        }
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
}

export default isAuthenticated