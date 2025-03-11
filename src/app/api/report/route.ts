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
    const routeListId = url.searchParams.get("routeListId");

    if (!routeListId) {
      return NextResponse.json(
        { message: "Missing routeListId", success: false },
        { status: 400 }
      );
    }

    const routeMachineList = await prisma.routeMachineList.findMany({
      where: {
        routeId: routeListId,
      },
      select: {
        id: true,
        areaId: true,
        equipmentGroupId: true,
        routeEquipmentNames: {
          select: {
            id: true,
            equipmentName: {
              select: {
                name: true,
              },
            },
            RouteComponent: {
              select: {
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
                  },
                },
                recommendations: {
                  take: 2,
                  orderBy: { createdAt: "desc" },
                  select: {
                    id: true,
                    priority: true,
                    recommendation: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // const routeMachineIds = routeMachineList.map((machine) => machine.id);

    // const routeEquipmentName = await prisma.routeEquipmentName.findMany({
    //     where: {
    //         routeMachineId: {in: routeMachineIds}
    //     },
    //     select: {

    //     }
    // })

    return NextResponse.json({ routeMachineList, success: true });
  } catch (error) {
    console.error("Error fetching route components", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
