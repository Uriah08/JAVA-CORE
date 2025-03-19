import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const clientId = session.user.id;

    const routeComponents = await prisma.routeComponent.findMany({
      where: { clientId: clientId },
      select: { id: true },
    });

    const routeComponentIds = routeComponents.map((rc) => rc.id);

    const latestComments = await prisma.routeComponentComment.findMany({
      where: {
        routeComponentId: { in: routeComponentIds },
      },
      orderBy: { createdAt: "desc" },
      distinct: ["routeComponentId"],
      select: {
        severity: true,
      },
    });

    // Define all possible severities to ensure none are missing
    const allSeverities = ["Critical", "Normal", "Moderate", "Severe", "Missed Points"];

    // Count occurrences of each severity in the retrieved comments
    const severityCounts = latestComments.reduce((acc, comment) => {
      acc[comment.severity] = (acc[comment.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Ensure all severities are included in the response, defaulting to 0 if missing
    const severityCountsArray = allSeverities.map((severity) => ({
      severity,
      count: severityCounts[severity] || 0, // Default to 0 if not present
    }));

    console.log(severityCountsArray);

    return NextResponse.json(
      { data: severityCountsArray, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching severity data:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
