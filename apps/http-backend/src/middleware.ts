import {NextFunction, Request,Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";
interface AuthRequest extends Request {
    email?: string;
}
export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("Auth middleware called");
    let token = req.headers["authorization"] ?? "";
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { email: string };
        console.log("Decoded token:", decoded);
        
        if (!decoded || !decoded.email) {
            return res.status(401).send({ message: "Unauthorized: Invalid token payload" });
        }

        const user = await prisma.user.findFirst({
            where: {
                email: decoded.email
            }
        });
        if (!user) {
            return res.status(401).send({ message: "Unauthorized: User not found" });
        }

        req.email = decoded.email;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).send({ message: "Unauthorized: Invalid or expired token" });
    }
};