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
    const jobNumber = url.searchParams.get("job");

    const jobs = await prisma.job.findMany({
      where: {
        jobNumber: {
          contains: jobNumber as string,
        },
      },
      select: {
        area: true,
        jobNumber: true,
        yearWeekNumber: true,
        reviewer: true,
        poNumber: true,
        woNumber: true,
        reportNumber: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        inspectionRoute: true,
        routeList: {
          select: {
            routeName: true,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "Searched Success", success: true, jobs },
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
