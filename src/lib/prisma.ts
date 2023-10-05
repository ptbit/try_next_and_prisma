// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

// const globalForPrisma = global as unknown as { prisma: any };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const prisma = new PrismaClient();
module.exports = {
  prisma,
};
// export default prisma;
