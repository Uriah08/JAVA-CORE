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
      }
    });

    console.log("Api data: ", routeMachineList);

    return NextResponse.json({ routeMachineList, success: true });
  } catch (error) {
    console.error("Error fetching route machine list", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
