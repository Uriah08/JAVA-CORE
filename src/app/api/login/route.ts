import { loginSchema } from '@/schema'
import { signIn } from '@/auth';

import { NextResponse } from 'next/server';

import { AuthError } from 'next-auth';
import { LOGIN_REDIRECT } from '@/routes';

export async function POST(req: Request){

    const body = await req.json();

    const validatedFields = loginSchema.safeParse(body);
            
    if (!validatedFields.success) {
        return NextResponse.json(
        { message: 'Validation failed', success: false, issues: validatedFields.error.issues },
        { status: 400 }
        );
    }
    const {email, password} = validatedFields.data
    
    try {
        await signIn("credentials", {
          email, password,
          redirectTo: LOGIN_REDIRECT
      })
      return NextResponse.json(
        { message: 'Success', success: true },
        { status: 200 })
      } catch (error) {
            if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return NextResponse.json(
                        { message: 'Invalid credentials', success: false },
                        { status: 401 }
                    );
                default:
                    return NextResponse.json(
                        {message: 'Something went wrong', success: false},
                        {status: 401})
            }
        }
        throw error;
        }
}