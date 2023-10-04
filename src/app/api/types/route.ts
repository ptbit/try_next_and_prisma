import prisma from "@lib/db";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const types = await prisma.type.findMany({});
    return NextResponse.json({ message: "OK", types }, { status: 200 });
  } catch (err) {
    console.log("catch");
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
