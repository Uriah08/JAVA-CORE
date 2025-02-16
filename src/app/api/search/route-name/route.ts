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
    const routeName = url.searchParams.get("routeName");

    const routeData = await prisma.routeList.findMany({
      where: {
        routeName: {
          contains: routeName as string,
        },
      },
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
                    components: {
                      select: {
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Search Successful", success: true, routeList: routeData },
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
