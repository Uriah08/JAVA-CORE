import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { CreateRouteSchema } from "@/schema";

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
