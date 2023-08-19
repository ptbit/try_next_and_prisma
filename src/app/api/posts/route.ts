import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const posts = await prisma.post.findMany()

    return NextResponse.json({ message: "OK", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};