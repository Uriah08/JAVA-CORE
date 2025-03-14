import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const url = new URL(req.url);
    const routeMachineId = url.searchParams.get("routeMachineId");

    if (!routeMachineId) {
      return NextResponse.json(
        { message: "Missing routeMachineId", success: false },
        { status: 400 }
      );
    }

    const routeEquipment = await prisma.routeEquipmentName.findMany({
      where: {
        routeMachineId: routeMachineId,
      },
      select: {
        id: true,
        equipmentName: {
          select: {
            name: true,
            groupId: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    console.log("Api data: ", routeEquipment);

    return NextResponse.json({ routeEquipment, success: true });
  } catch (error) {
    console.error("Error fetching route equipment", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
