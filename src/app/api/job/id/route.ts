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
        const clientId = url.searchParams.get("clientId");

        if (!clientId) {
            throw new Error("Missing job ID");
        }

        const jobs = await prisma.job.findMany({
            where: {
                userId: clientId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            }
        });
    
        return NextResponse.json({ message: 'Job created successfully', success: true, jobs}, { status: 201 });
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}