import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    // const prismaUsers = await prisma.user.findMany()

    // return NextResponse.json({ message: "OK", prismaUsers }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const {name, email} = await req.json();

    // const newUser = await prisma.user.create({
    //   data: {
    //     name,
    //     email
    //   }
    // })

    // return NextResponse.json({ message: "OK", newUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
};
