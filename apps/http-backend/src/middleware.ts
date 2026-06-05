import {NextFunction, Request,Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import prisma from "@repo/db/client";

interface AuthRequest extends Request {
    email?: string;
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("Auth middleware called");
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { email: string };
    console.log("Decoded token:", decoded);
    if(decoded.email){
        req.email = decoded.email;
         next();
    } else {
        return res.status(401).send({message: "Unauthorized"});
    }
   
};