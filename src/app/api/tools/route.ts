import prisma from "@lib/db";
import { NextResponse } from "next/server";

type TypeType = {
  id: number;
};

export const GET = async () => {
  try {
    const tools = await prisma.tool.findMany({
      include: {
        type: true,
      },
    });
    return NextResponse.json({ message: "OK", tools }, { status: 200 });
  } catch (err) {
    console.log("catch");
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { title, description, image, types } = await req.json();
  const newTypes: number[] = new Array(...types);
  let connectArr: TypeType[] = [];

  newTypes.forEach((type) => {
    connectArr.push({ id: type });
  });
  try {
    const resp = await prisma.tool.create({
      data: {
        title,
        description,
        image,
        type: { connect: connectArr },
      },
    });
    return NextResponse.json({ message: "OK", resp }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
};

// export const POST = async (req: Request) => {
//   const { id, newTitle } = await req.json();
//   console.log("edit tool title by id", id, "new title:", newTitle);
//   try {
//     const resp = await prisma.tool.update({
//       where: { id: id },
//       data: { title: newTitle },
//     });
//     return NextResponse.json({ message: "OK", resp }, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ message: "POST Error", err }, { status: 500 });
//   }
// };
