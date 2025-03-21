"use client"

import React from "react";
import Hero from "@/components/container/home/Hero";
import About from "@/components/container/home/About";
import Services from "@/components/container/home/Services";
import Contacts from "@/components/container/home/Contacts";
import Footer from "@/components/container/home/Footer";
import ArrowButtonUP from "@/components/container/home/ArrowButtonUp";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/loading";

import { useRouter } from "next/navigation";

import { useGetVerifiedClientQuery } from "@/store/api";

const HomePage = () => {

  const { data: verify, error, isLoading: verifyLoading } = useGetVerifiedClientQuery(navigator.userAgent, {
    pollingInterval: 5000,
  });

  const errorType = error ? ("data" in error ? (error.data as { errorType: string }).errorType : error) : "No error";

  const { data: session, status } = useSession();
  const router = useRouter()
  React.useEffect(() => {
    if(errorType === "device_not_verified") {
      router.push('/OTP-Verification')
    }
  }, [router, errorType])

  React.useEffect(() => {
    if(errorType) {
      if(session?.user.role === "admin") {
        if (localStorage.getItem("redirected") === "false") {
          localStorage.setItem("redirected", "true");
          router.push('/job-registry')
        }
      }
      if(session?.user.role === "user") {
        if (localStorage.getItem("redirected") === "false") {
          localStorage.setItem("redirected", "true");
          router.push('/client-job-registry')
        }
      }
    }
  }, [router, session?.user.role, errorType])

  const verifiedSuccess = () => {
    if(status === 'authenticated') {
      if(!verify?.success) {
        return true
      }
    }
    return false
  }
  
  return (
    <>
    {(errorType === "email_not_verified") && (
      <div className="fixed bottom-10 left-10 bg-white rounded-lg p-3 z-[99]">
        <h1 className="text-sm">This account is not verified</h1>
      </div>
    )}
    {status === 'loading' || verifyLoading || verifiedSuccess() ? (
      <div className="w-full h-screen">
        <Loading/>
      </div>
    ) : (
      <div className="w-full h-full">
      <Hero session={session} status={status}/>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="contact">
        <Contacts />
      </div>
      <Footer />
      <div className="z-10">
        <ArrowButtonUP />
      </div>
    </div>
    )}
    </>
  );
};

export default HomePage;
