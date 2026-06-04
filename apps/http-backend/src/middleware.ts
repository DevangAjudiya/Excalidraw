import {NextFunction, Request,Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";


interface AuthRequest extends Request {
    userId?: string;
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { userId: string };
    if(decoded.userId){
        req.userId = decoded.userId;
         next();
    } else {
        return res.status(401).send({message: "Unauthorized"});
    }
   
};