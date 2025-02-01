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

const HomePage = () => {
  const { data: session, status } = useSession();

  return (
    <>
    {status === 'loading' ? (
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
