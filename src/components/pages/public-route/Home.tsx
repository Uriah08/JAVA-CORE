import React from "react";
import Hero from "@/components/container/home/Hero";
import About from "@/components/container/home/About";
import Services from "@/components/container/home/Services";
import Contacts from "@/components/container/home/Contacts";
import Footer from "@/components/container/home/Footer";
import ArrowButtonUP from "@/components/container/home/ArrowButtonUp";

const HomePage = () => {
  return (
    <div className="w-full h-full">
      <Hero />
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
  );
};

export default HomePage;
