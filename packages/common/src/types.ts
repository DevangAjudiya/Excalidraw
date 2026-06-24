import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.string().email().min(3).max(50),
    name: z.string().min(3).max(50),
    password: z.string().min(6).max(100),
    photo: z.string().optional()
});

export const SignInUserSchema = z.object({
    email: z.string().email().min(3).max(50),
    password: z.string().min(6).max(100)
});

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(50),
});