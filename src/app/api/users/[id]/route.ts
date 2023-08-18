import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const id = +req.url.split("/users/")[1];
    const prismaUser = await prisma.user.findUnique({ where: { id } });
    if (!prismaUser) {
      return NextResponse.json({ message: "User don`t Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "OK", prismaUser }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Get user by id is error", err }, { status: 404 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = +req.url.split("/users/")[1];
    await prisma.user.delete({ where: { id } });

    return NextResponse.json("User has been deleted");
  } catch (err) {
    return NextResponse.json({ message: "Get user by id is error", err }, { status: 404 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const { name, email } = await req.json();
    const id = +req.url.split("/users/")[1];

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
    return NextResponse.json({ message: "OK", updatedUser }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "User not found", err }, { status: 404 });
  }
};

// export const GET = async (req: Request) => {
//   try {
//     const id = req.url.split("/blogs/")[1];
//     const post = getPostById(+id);
//     if (!post) {
//       return NextResponse.json({ message: `No post founded by id:${id}` }, { status: 404 });
//     }
//     return NextResponse.json({ message: "OK", post }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
//   }
// };
