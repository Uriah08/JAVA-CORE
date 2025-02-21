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
    console.log("Captured data: ", parsedBody.data);

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
                create: equipmentNames.flatMap(
                  (equipment) =>
                    Array.isArray(equipment.components)
                      ? equipment.components.map((componentId) => ({
                          componentId,
                        }))
                      : [] // Ensure it always returns an array
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
    )}

    const routes = await prisma.routeList.findMany({
      where: {
        userId: clientId
      }
    })

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
