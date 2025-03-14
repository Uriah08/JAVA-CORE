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
    const routeEquipmentId = url.searchParams.getAll("routeEquipmentId");

    if (!routeEquipmentId) {
      return NextResponse.json(
        { message: "Missing routeEquipmentId", success: false },
        { status: 400 }
      );
    }

    const routeComponent = await prisma.routeComponent.findMany({
      where: {
        routeEquipmentId: { in: routeEquipmentId },
      },
      select: {
        id: true,
        routeEquipmentId: true,
        component: {
          select: {
            name: true,
          },
        },
        comments: {
          take: 2,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            severity: true,
            comment: true,
            createdAt: true,
          },
        },
        recommendations: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            priority: true,
            recommendation: true,
            createdAt: true,
          },
        },
      },
    });

    console.log("Api data: ", routeComponent);

    return NextResponse.json({ routeComponent, success: true });
  } catch (error) {
    console.error("Error fetching route component", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
