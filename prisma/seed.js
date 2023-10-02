import { types } from "./types.js";
import { tools } from "./tools.js";

import { PrismaClient } from "@prisma/client";
// const {PrismaClient} = require("prisma/client");
const prisma = new PrismaClient();

async function seeding() {
  await prisma.type.deleteMany();
  const tableName = "Type";
  await prisma.$queryRaw`UPDATE sqlite_sequence SET seq=0 WHERE name="Type"`;

  for (let type of types) {
    await prisma.type.create({
      data: type,
    });
  }

  console.log("types are seeded");
  try {
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seeding();
