import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const body =  await req.json()
    try {
        const session = await auth()
        if (!session) {
            throw new Error("Not Authorized")
        }
        
        const { otp, userAgent } = body

        const code = await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            select: {
                otp: true
            }
        })     

        if(otp !== code?.otp) {
            return NextResponse.json({ message: 'Invalid OTP', success: false}, { status: 400 });
        }

        if (!session.user.id) {
            throw new Error("User ID is undefined");
        }

        await prisma.verifiedDevice.create({
            data: {
                userId: session.user.id,
                userAgent
            }
        })

        return NextResponse.json({ message: 'Client Verified Successfully', success: true});
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}