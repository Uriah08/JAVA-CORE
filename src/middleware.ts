import authConfig from "@/auth.config";
import NextAuth from "next-auth";


import { LOGIN_REDIRECT, publicRoutes, apiAuthPrefix, authRoutes, apiPrefix, protectedRoutes } from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const user = req.auth?.user;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isApiRoute = apiPrefix.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return NextResponse.next();
    }
    if (isApiRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            if (nextUrl.pathname === LOGIN_REDIRECT) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL(LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        if (nextUrl.pathname === "/auth/sign-in") {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
    }

    if (isLoggedIn && user?.role === "user" && isProtectedRoute) {
        return NextResponse.redirect(new URL(LOGIN_REDIRECT, nextUrl));
      }

    return NextResponse.next();
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}