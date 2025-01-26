import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="h-screen">
      <div className="bg-red-700 h-2/3 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-5">
          <div className="flex items-center">
            <Image
              src="/Outlook-gig2o1qk.png"
              alt="Logo"
              width={72}
              height={72}
              className="mr-2"
            />
            <span className="text-xl font-extralight text-white">
              Java Condition Monitoring
            </span>
          </div>
          <div className="space-x-7 px-10   ">
            <Button
              variant="default"
              className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
            >
              Home
            </Button>
            <Button
              variant="default"
              className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
            >
              Login
            </Button>
          </div>
        </nav>

        {/* Content */}
        <div className="flex items-center justify-center flex-grow">
          <h1 className="text-6xl font-semibold text-white">
            Machinery Health Specialist
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
