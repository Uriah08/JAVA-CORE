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

    const { clientId, routeName, areaId, equipmentNames } = parsedBody.data;

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { message: "User  ID is required", success: false },
        { status: 401 }
      );
    }

    const newRoute = await prisma.routeList.create({
      data: {
        clientId,
        routeName,
        isUsed: false,
      },
    });

    const newMachine = await prisma.routeMachineList.create({
      data: {
        routeId: newRoute.id,
        areaId,
      },
    });

    for (const equipment of equipmentNames) {
      const newEquipment = await prisma.routeEquipmentName.create({
        data: {
          routeMachineId: newMachine.id,
          equipmentNameId: equipment.id,
        },
      });

      for (const componentId of equipment.components || []) {
        const newComponent = await prisma.routeComponent.create({
          data: {
            componentId,
            clientId: newRoute.clientId,
            routeMachineId: newMachine.id,
            routeEquipmentId: newEquipment.id,
          },
        });

        console.log("Created RouteComponent:", newComponent);
      }
    }

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

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json(
        { message: "Missing route list ID", success: false },
        { status: 400 }
      );
    }

    const routes = await prisma.routeList.findMany({
      where: {
        clientId,
        isUsed: false,
      },
    });

    console.log(routes);

    return NextResponse.json(
      { message: "Route created successfully", routes, success: true },
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
