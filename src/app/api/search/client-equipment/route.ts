import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "No active session", success: false },
        { status: 401 }
      );
    }
    console.log("User authenticated:", session.user.name);

    const url = new URL(req.url);
    const equipmentName = url.searchParams.get("equipmentName");

    console.log("search data: ", equipmentName);

    const getEquipmentName = await prisma.equipmentName.findMany({
      where: {
        name: {
          contains: equipmentName as string,
        },
        isDelete: false,
      },
      select: {
        id: true,
        name: true,
        components: {
          where: {
            isDelete: false,
          },
          select: {
            id: true,
            name: true,
            routeComponent: {
              where: {
                clientId: session.user.id,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    console.log("Fetched data: ", getEquipmentName);

    return NextResponse.json(
      { message: "Searched Success", success: true, getEquipmentName },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in route handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
