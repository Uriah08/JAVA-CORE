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
    const groupId = url.searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json(
        { message: "Missing group ID", success: false },
        { status: 400 }
      );
    }

    const equipmentNames = await prisma.equipmentName.findMany({
      where: { groupId },
    });

    return NextResponse.json({ equipmentNames });
  } catch (error) {
    console.error("Error fetching equipment names:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
