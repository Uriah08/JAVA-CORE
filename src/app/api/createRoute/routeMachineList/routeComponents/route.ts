import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const url = new URL(req.url);
    const routeEquipmentIds = url.searchParams.getAll("routeEquipmentId");

    if (!routeEquipmentIds.length) {
      return NextResponse.json(
        { message: "Missing routeEquipmentId(s)", success: false },
        { status: 400 }
      );
    }

    const routeComponents = await prisma.routeComponent.findMany({
      where: {
        routeEquipmentId: { in: routeEquipmentIds },
      },
      select: {
        id: true,
        routeEquipmentId: true,
        action: true,
        note: true,
        component: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ routeComponents, success: true });
  } catch (error) {
    console.error("Error fetching route components", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
