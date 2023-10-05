import prisma from "@lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { newTypeId } = await req.json();
  const id = +req.url.split("/tools/")[1];

  try {
    const check = await prisma.tool.findFirst({
      where: { id: id },
      include: {
        type: true,
      },
    });

    const typesIdArr: number[] = [];
    if (check) {
      check.type.forEach((type) => {
        typesIdArr.push(type.id);
      });
    }

    let resp;
    if (typesIdArr.includes(newTypeId)) {
      resp = await prisma.tool.update({
        where: { id: id },
        data: {
          type: {
            disconnect: {
              id: +newTypeId,
            },
          },
        },
      });
    } else {
      resp = await prisma.tool.update({
        where: { id: id },
        data: {
          type: {
            connect: {
              id: +newTypeId,
            },
          },
        },
      });
    }

    return NextResponse.json({ message: "OK", resp }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = +req.url.split("/tools/")[1];
    await prisma.tool.delete({ where: { id } });

    return NextResponse.json("Tool has been deleted");
  } catch (err) {
    return NextResponse.json(
      { message: "Delete tool by id is error", err },
      { status: 404 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    const { title, description, image, connectArrIds, disconnectArrIds } =
      await req.json();
    const id = +req.url.split("/tools/")[1];


    const updatedTool = await prisma.tool.update({
      where: { id },
      data: {
        title,
        description,
        image,
        type: {
          disconnect: disconnectArrIds,
          connect: connectArrIds,
        },
      },
    });
    return NextResponse.json({ message: "OK", updatedTool }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Tool not found", err },
      { status: 404 }
    );
  }
};
