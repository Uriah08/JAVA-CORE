import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { CreateRouteSchema } from "@/schema";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const routeLists = await prisma.routeList.findMany({
      select: {
        id: true,
        routeName: true,
        machines: {
          select: {
            id: true,
            area: {
              select: {
                id: true,
                name: true,
              },
            },
            equipmentGroup: {
              select: {
                id: true,
                name: true,
              },
            },
            routeEquipmentNames: {
              select: {
                id: true,
                equipmentName: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            routeComponents: {
              select: {
                id: true,
                component: {
                  select: {
                    name: true,
                  },
                },
                comments: {
                  select: {
                    id: true,
                    severity: true,
                    comment: true,
                    createdAt: true,
                  },
                },
                recommendations: {
                  select: {
                    id: true,
                    priority: true,
                    recommendation: true,
                    createdAt: true,
                  },
                },
                temperatures: {
                  select: {
                    id: true,
                    temperature: true,
                    createdAt: true,
                  },
                },
                oilAnalyses: {
                  select: {
                    id: true,
                    analysis: true,
                    createdAt: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ routeLists });
  } catch (error) {
    console.error("Error fetching areas:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();

    const parsedBody = CreateRouteSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.errors, success: false },
        { status: 400 }
      );
    }

    const { clientName, routeName, areaId, equipmentNames } = parsedBody.data;

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { message: "User  ID is required", success: false },
        { status: 401 }
      );
    }

    const newRoute = await prisma.routeList.create({
      data: {
        userId,
        clientName,
        routeName,
        machines: {
          create: [
            {
              areaId,
              routeEquipmentNames: {
                create: equipmentNames.map((equipment) => ({
                  equipmentNameId: equipment.id,
                })),
              },
              routeComponents: {
                create: equipmentNames.flatMap((equipment) =>
                  (equipment.components || []).map((componentId) => ({
                    componentId,
                  }))
                ),
              },
            },
          ],
        },
      },
    });

    return NextResponse.json(
      { message: "Route created successfully", route: newRoute, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
