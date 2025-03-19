import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth()
        
        if (!session) {
            throw new Error('Not Authenticated')
        }

        const verified = await prisma.user.findUnique({
            where: {
                id: session.user.id,
                emailVerified: { not : null }
            }
        })
        
        if(!verified) {
            throw new Error("You're Not Verified");
        }
        
        return NextResponse.json({ message: 'Client fetched successfully', success: true});
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}

export async function POST(req: Request) {
    const body = await req.json()
    try {
        const session = await auth()
        
        if (!session || (session.user.id !== process.env.ADMIN)) {
            throw new Error('Not Authenticated')
        }

        const { id } = body

        await prisma.user.update({
            where: {
                id
            },
            data: {
                emailVerified: new Date()
            }
        })

        return NextResponse.json({ message: 'Client fetched successfully', success: true});
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}