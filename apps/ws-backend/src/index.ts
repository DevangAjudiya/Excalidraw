import websocket from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {prisma} from "@repo/db/client"
const wss = new websocket.Server({ port: 8082 });

interface User {
    ws: websocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try{
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded == "string") {
        return null;
    }
    if (!decoded || !decoded.email) {
        return null;
    }
    return decoded.email;
    }catch(err){
        console.log("token unavailable");
        return null
    }
}



wss.on("connection", (ws, request) => {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    const userId = checkUser(token);
    if (userId == null) {
        ws.close();
        return;
    }
    users.push({
        ws,
        rooms: [],
        userId
    })

    ws.on("message", async function message(data) {
        let parseData;
        try {
            parseData = JSON.parse(data as unknown as string);
        } catch (e) {
            console.error("Failed to parse WebSocket message:", e);
            return;
        }

        if (parseData.type == "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parseData.roomId);
        }

        if (parseData.type == "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (user) {
                user.rooms = user.rooms.filter(x => x !== parseData.roomId);
            }
        }

        if (parseData.type === "chat") {
            const roomId: string = parseData.roomId;
            const messageText: string = parseData.message;

            try {
                await prisma.chat.create({
                    data: {
                        roomId,
                        message: messageText,
                        userId: userId
                    }
                });

                users.forEach(user => {
                    if (user.rooms.includes(roomId)) {
                        user.ws.send(JSON.stringify({
                            type: "chat",
                            message: messageText,
                            roomId
                        }));
                    }
                });
            } catch (err) {
                console.error("Error handling chat message:", err);
            }
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        const index = users.findIndex(x => x.ws === ws);
        if (index !== -1) {
            users.splice(index, 1);
        }
    });

});

console.log("WebSocket server is running on port 8082");
