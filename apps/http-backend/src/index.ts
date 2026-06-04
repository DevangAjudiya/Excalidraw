import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { JWT_SECRET } from "./config";
import { authMiddleware } from "./middleware";
const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req , res ) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
    const { username ,password } = req.body;
    const token = jwt.sign({username}, JWT_SECRET);
    res.send({
        message: `User ${username} signed up successfully!`,
        token : token
    });
  
});

app.post("/signin", (req, res) => {
    const { username ,password } = req.body;
    const token = jwt.sign({username}, JWT_SECRET);
    res.send({ 
        message: `User ${username} signed in successfully!`,
        token: token
     });
});

app.post("/room", authMiddleware, (req, res) => {
    const { roomName } = req.body;
    res.send({
        message: `Room ${roomName} created successfully!`,
    });
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});