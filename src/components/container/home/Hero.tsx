import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeartRateGraph from "./HertRateGraph";

const Hero = () => {
  // Sample heart rate data
  const heartRateData = [
    58, 58, 80, 20, 100, 60, 90, 30, 90, 50, 100, 80, 100, 40, 60, 60,
  ];
  return (
    <div className="h-screen">
      <div className="bg-main h-2/3 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-5">
          <div className="flex items-center">
            <Image
              src="/logoo.png"
              alt="Logo"
              width={62}
              height={62}
              className="mr-2 w-auto h-auto"
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
            <Link href={"/auth/sign-in"}>
              <Button
                variant="default"
                className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
              >
                Login
              </Button>
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="flex items-center justify-center flex-grow">
          <h1 className="text-6xl font-semibold text-white">
            Machinery Health Specialist
          </h1>
        </div>
      </div>
      <div className="absolute bottom-5 left-0 right-0">
        {/* HeartRateGraph Component with overflow */}
        <HeartRateGraph data={heartRateData} />
      </div>
    </div>
  );
};

export default Hero;
