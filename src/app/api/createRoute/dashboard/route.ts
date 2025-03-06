import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session || session.user.id !== process.env.ADMIN) {
            throw new Error("Not Authenticated");
        }

        const recentRoutes = await prisma.routeList.findMany({
            orderBy: { createdAt: "desc" },
            take: 3,
            select: {
                id: true,
                routeName: true,
                createdAt: true,
                isUsed: true,
            },
        });

        return NextResponse.json({ success: true, routes: recentRoutes });
    } catch (error) {
        console.error("Error creating route:", error);
        return NextResponse.json(
        { message: "Internal Server Error", success: false },
        { status: 500 }
        );
    }
}