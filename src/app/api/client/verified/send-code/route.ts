import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

import { generateOtp } from "@/lib/generate-otp";
import { Resend } from "resend";
import { VerificationTemplate } from "@/components/container/mails/Verification";

export async function POST() {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const session = await auth()
        if (!session) {
            throw new Error("Not Authorized")
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { otpCooldown: true },
        });

        const now = new Date();

        if (user?.otpCooldown && new Date(user.otpCooldown).getTime() > now.getTime()) {
            const remainingTime = Math.ceil((new Date(user.otpCooldown).getTime() - now.getTime()) / 1000);
            return NextResponse.json({ message: 'Cooldown', success: true, remainingTime }, { status: 200 });
        }

        const code = generateOtp()

        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                otp: code,
                otpCooldown: new Date(now.getTime() + 60 * 1000),
            }
        })    
        
        console.log("Code:", code);
        
        // const emailContent = await VerificationTemplate({ code });

        // await resend.emails.send({
        //     from: 'Acme <onboarding@resend.dev>',
        //     to: [`${session.user.email}`],
        //     subject: 'Sample',
        //     react: emailContent,
        // });
        
        return NextResponse.json({ message: 'Sent Code Successfully', success: true});
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}