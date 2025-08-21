import { PrismaClient } from "./generated/prisma";

/**
 * Prisma client instance used for interacting with the database.
 */
const prisma = new PrismaClient();

export default prisma;
