import { PrismaClient } from "../generated/prisma";
import dotenv from "dotenv";
import path from "path";

// Load .env from the db package root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
