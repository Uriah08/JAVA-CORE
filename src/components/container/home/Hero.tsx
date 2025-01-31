import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleArrowDown } from "lucide-react";
import HeartRateGraph from "./HertRateGraph";

import { Session } from 'next-auth'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { signOut } from "next-auth/react";

const Hero = ({session, status}: {session?:Session | null, status?: "authenticated" | "loading" | "unauthenticated"}) => {
  const heartRateData = [
    58, 58, 38, 80, 58, 58, 38, 80, 38, 58, 50, 80, 38, 38, 80, 58, 58, 38, 80,
    38, 58, 58,
  ];

  return (
    <div className="h-screen">
      <div className="relative bg-main h-[90%] flex flex-col overflow-hidden [border-bottom-left-radius:100%_25%] [border-bottom-right-radius:100%_25%]">
        <nav className="flex justify-between items-center p-10">
          <div className="flex items-center">
            <Image
              src="/logoo.png"
              alt="Logo"
              width={62}
              height={62}
              className="mr-2 w-auto h-auto"
            />
          </div>
          <div className="flex space-x-10">
            <Link href="#home">
              <Button
                variant="default"
                className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
              >
                Home
              </Button>
            </Link>
            <Link href="#about">
              <Button
                variant="default"
                className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
              >
                About
              </Button>
            </Link>
            <Link href="#services">
              <Button
                variant="default"
                className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
              >
                Our Services
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                variant="default"
                className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
              >
                Contact
              </Button>
            </Link>
          </div>
          <div>
            {status === 'authenticated' ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                  variant="default" 
                  className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900">{session?.user.name}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="py-1 bg-white border-none shadow-none flex flex-col gap-1">
                  {session?.user.role === 'admin' && 
                    <Link href={'/job-registry'}>
                    <Button className="w-full hover:bg-follow bg-main">
                      Admin
                    </Button>
                    </Link>}
                  <Button onClick={() => signOut()} className="w-full hover:bg-follow bg-main">Sign Out</Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Link href={"/auth/sign-in"}>
              <Button
                variant="default"
                className="bg-transparent shadow-none text-white text-xl font-semibold hover:bg-red-900"
              >
                Login
              </Button>
            </Link>
            )}
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center flex-grow text-white">
          <h1 className="text-6xl font-semibold z-10 mt-10">
            Java Condition Monitoring
          </h1>
          <h2 className="text-4xl font-semibold z-10 mt-2">
            Machinery Health Specialist
          </h2>
          <p className="z-10 text-center max-w-2xl mt-8">
            Ensure optimal performance and longevity of your equipment with our
            expert machine health specialist services, providing proactive
            maintenance and diagnostics.
          </p>
          <Link href="#contact">
            <Button className="z-10 bg-red-800 hover:bg-red-900 text-white mt-10">
              Contact Us
            </Button>
          </Link>
          <Link href="#about" className="z-10 mt-10">
            <CircleArrowDown className="w-10 h-10 text-white animate-bounce" />
          </Link>
          <div className="absolute bottom-4 right-4 flex items-center justify-center space-x-[-20px]">
            {/* Gear 1 */}
            <Image
              src="/gear1.png"
              alt="Gear 1"
              width={450}
              height={450}
              className="animate-spin absolute -bottom-36 -right-32 z-10"
            />
            <Image
              src="/gear1.png"
              alt="Gear 3"
              width={250}
              height={250}
              className="animate-spin-reverse relative top-0 left-32"
            />
            <Image
              src="/gear1.png"
              alt="Gear 2"
              width={200}
              height={200}
              className="animate-spin-reverse relative bottom-11 left-14"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-28 left-0 right-0">
        <HeartRateGraph data={heartRateData} />
      </div>
    </div>
  );
};

export default Hero
