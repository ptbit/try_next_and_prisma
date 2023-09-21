import { prisma } from "@lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const tools = await prisma.tool.findMany({
      include: {
        description: true,
        type: true,
        status: true,
      },
    });
    return NextResponse.json({ message: "OK", tools }, { status: 200 });
  } catch (err) {
    console.log("catch");
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async () => {
  try {
    // const { name, email } = await req.json();  req: Request

    const resp = await prisma.tool.create({
      data: {
        arrivalAt: "2012-02-019",
        id: 3,
        image:
          "https://wiki.protospace.ca/images/thumb/6/6e/159.jpg/250px-159.jpg",
        legalStatusId: 1,
        locationId: 1,
        model:
          "Rabbit Laser USA RL-80-1290 (where RL is the factory code, 80 is the original laser power in watts, and 1290 represents the bed size (1200 x 900 mm))",
        note: "",
        origin: "Brian Queen",
        serialNumber: "",
        // status: { name: "work" },
        statusId: 1,
        title: "Laser cutter, large (Rabbit Laser RL-80-1290)",
        type: [{ id: 1, name: "3d printer" }],
        wikiID: "6",
      },
    });
    // await prisma.Type
    return NextResponse.json({ message: "OK", resp }, { status: 201 });
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
