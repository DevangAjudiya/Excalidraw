import websocket from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new websocket.Server({ port: 8082 });

wss.on("connection", (ws, request) => {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    if (!token) {
        ws.close();
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
        username: string;
    };
    if (!decoded || !decoded.userId) {
        ws.close();
        return;
    }

    console.log("Client connected");
    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });

});

console.log("WebSocket server is running on port 8082");
