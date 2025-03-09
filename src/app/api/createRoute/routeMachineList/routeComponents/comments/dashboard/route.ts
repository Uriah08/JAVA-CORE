import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            throw new Error("Not Authenticated");
        }

        const severities = await prisma.routeComponentComment.groupBy({
            by: ["severity"],
            _count: { severity: true },
        });

        const severityCounts = severities.map((s) => ({
            severity: s.severity,
            count: s._count.severity,
        }));

        return NextResponse.json(
            { data: severityCounts, success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { message: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}