import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Session } from "next-auth";

import { Menu, X } from "lucide-react";

const Hero = ({
  session,
  status,
}: {
  session?: Session | null;
  status?: "authenticated" | "loading" | "unauthenticated";
}) => {

  const [active, setActive] = React.useState(false)
  console.log(active);
  

  return (
    <div className="h-screen">
      <div className="relative bg-zinc-800 h-[90%] flex flex-col overflow-hidden [border-bottom-left-radius:100%_25%] [border-bottom-right-radius:100%_25%]">
        <div className={`fixed lg:hidden top-0 h-[500px] w-full bg-white z-20 duration-200 flex flex-col justify-center gap-5 items-center transition-all ${active ? '' : '-mt-[1000px]'}`}>
          <X onClick={() => setActive(!active)} className="absolute right-5 top-10 text-main cursor-pointer" size={35}/>
          <a href="#home" onClick={() => setActive(!active)} className="text-xl font-light text-main cursor-pointer duration-200 transition-all hover:text-follow">Home</a>
            <a href="#about" onClick={() => setActive(!active)} className="text-xl font-light text-main cursor-pointer duration-200 transition-all hover:text-follow">About</a>
            <a href="#services" onClick={() => setActive(!active)} className="text-xl font-light text-main cursor-pointer duration-200 transition-all hover:text-follow">Services</a>
            <a href="#contact" onClick={() => setActive(!active)} className="text-xl font-light text-main cursor-pointer duration-200 transition-all hover:text-follow">Contact</a>
            {status === "authenticated" ? (
            session?.user.role === "admin" ? (
              <Link href={'/job-registry'} className="bg-main duration-200 transition-all hover:bg-follow px-10 py-3 bg-opacity-85 rounded-full h-fit font-semibold text-base text-white cursor-pointer">Admin</Link>
            ) : (
              <Link href={'/client-job-registry'} className="bg-main duration-200 transition-all hover:bg-follow px-10 py-3 bg-opacity-85 rounded-full h-fit font-semibold text-base text-white cursor-pointer">Client</Link>
            )
            ) : (
              <Link href={'/auth/sign-in'} className="bg-main duration-200 transition-all hover:bg-follow px-10 py-3 bg-opacity-85 rounded-full h-fit font-semibold text-base text-white cursor-pointer">Sign In</Link>
            )}
        </div>
        <Image src={'/hero.png'} width={1000} height={1000} alt="hero" className="absolute object-center object-cover h-screen w-full z-0"/>
        <Image src={'/heartbeat.svg'} width={1} height={1} alt="beat" className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 opacity-30 w-full"/>
        <Image src={'/gear.svg'} width={1} height={1} alt="gear" className="absolute -right-10 animate-spin w-[200px] bottom-0 opacity-65"/>
        <nav className="w-full p-5 md:p-10 flex justify-between z-10 items-center">
          <div className="w-[150px]">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={62}
            height={62}
            className="mr-2 w-auto h-auto"
          />
          </div>
          <div className="hidden lg:flex gap-20">
            <a href="#home" className="text-xl font-light text-white cursor-pointer duration-200 transition-all hover:text-red-300">Home</a>
            <a href="#about" className="text-xl font-light text-white cursor-pointer duration-200 transition-all hover:text-red-300">About</a>
            <a href="#services" className="text-xl font-light text-white cursor-pointer duration-200 transition-all hover:text-red-300">Services</a>
            <a href="#contact" className="text-xl font-light text-white cursor-pointer duration-200 transition-all hover:text-red-300">Contact</a>
          </div>
          {status === "authenticated" ? (
            session?.user.role === "admin" ? (
              <Link href={'/job-registry'} className="bg-main hidden lg:block duration-200 transition-all hover:bg-follow px-10 py-3 bg-opacity-85 rounded-full h-fit font-semibold text-base text-white cursor-pointer">Admin</Link>
            ) : (
              <Link href={'/client-job-registry'} className="bg-main hidden lg:block duration-200 transition-all hover:bg-follow px-10 py-3 bg-opacity-85 rounded-full h-fit font-semibold text-base text-white cursor-pointer">Client</Link>
            )
          ) : (
            <Link href={'/auth/sign-in'} className="bg-main hidden lg:block duration-200 transition-all hover:bg-follow px-10 py-3 bg-opacity-85 rounded-full h-fit font-semibold text-base text-white cursor-pointer">Sign In</Link>
          )}
          <Menu onClick={() => setActive(!active)} className={`${active ? 'text-main' : 'text-white'} cursor-pointer lg:hidden`} size={35}/>
        </nav>
        <div className="flex flex-col items-center justify-center flex-grow text-white relative">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold z-10 mt-10 text-center">
            Java Condition Monitoring
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold z-10 mt-2 text-center">
            Machinery Health Specialist
          </h2>
          <p className="z-10 text-center max-w-2xl mt-8 font-light text-sm md:text-base px-3">
            Ensure optimal performance and longevity of your equipment with our
            expert machine health specialist services, providing proactive
            maintenance and diagnostics.
          </p>
          <Link href="#contact" className="rounded-full px-10 py-4 bg-main text-white duration-200 transition-all hover:bg-follow text-xl font-semibold mt-10">
          Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero
