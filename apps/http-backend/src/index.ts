import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { prisma } from "@repo/db/client";
import { JWT_SECRET } from "@repo/backend-common/config";
import { authMiddleware } from "./middleware";
import { CreateUserSchema, SignInUserSchema, CreateRoomSchema } from "@repo/common/types";
const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).send({ message: "Invalid request data", errors: data.error });
    }
    const { email, password, name, photo } = data.data;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name,
                photo
            }
        });
        if (!user) {
            return res.status(500).send({ message: "Failed to create user" });
        }

        res.send({
            message: `User ${name} signed up successfully!`,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const data = SignInUserSchema.safeParse(req.body);


    if (!data.success) {
        return res.status(400).send({ message: "Invalid request data", errors: data.error });
    }


    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            id: true, password: true, email: true
        }
    });

    if (!user || user.password !== password) {
        return res.status(401).send({ message: "Invalid email or password" });
    }


    const token = jwt.sign({ email }, JWT_SECRET);
    res.send({
        message: `User ${email} signed in successfully!`,
        token: token
    });
});

app.post("/room", authMiddleware, async (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).send({ message: "Invalid request data", errors: data.error });
    }

    const email = (req as any).email;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const response = await prisma.room.create({
        data: {
            slug: data.data.name,
            adminId: email 
        }
    });

    res.send({
        roomId: response.id,
        slug: response.slug
    });
});

app.get("/chats/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    if (!roomId) {
        return res.status(400).send({ message: "roomId is required" });
    }
    
    try {
        const chats = await prisma.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
        res.send({
            messages: chats
        });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});