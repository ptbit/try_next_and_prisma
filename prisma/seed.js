const { types } = require("./types.js");
const { tools } = require("./tools.js");
import prisma from './db'
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

async function seeding() {
  await prisma.type.deleteMany();
  await prisma.$queryRaw`UPDATE sqlite_sequence SET seq=0 WHERE name="Type"`;

  for (let type of types) {
    await prisma.type.create({
      data: type,
    });
  }

  console.log("types are seeded");

  await prisma.tool.deleteMany();
  await prisma.$queryRaw`UPDATE sqlite_sequence SET seq=0 WHERE name="Tool"`;

  for (let oneTool of tools) {
    await prisma.tool.create({
      data: oneTool,
    });
  }

  console.log("tools are seeded");

  try {
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seeding();
