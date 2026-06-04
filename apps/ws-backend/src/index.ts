import websocket from "ws";

const wss = new websocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");
    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
    }
    );
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is running on port 8080");