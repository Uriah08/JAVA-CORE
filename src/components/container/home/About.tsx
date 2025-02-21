import React from "react";
import Image from "next/image";
import { ChartSpline, ShieldPlus, ClipboardList, BrainCog } from "lucide-react";

const About = () => {
  return (
    <div>
      <div className="w-screen h-full xl:h-screen flex justify-center xl:flex-row flex-col-reverse gap-20 items-center py-16 px-10">
        <div className="flex items-center gap-5">
        <div className="flex justify-end h-fit">
          <Image
            src="/machin2.jpg"
            width={300}
            height={450}
            alt="Machine small"
            className="object-cover"
          />
        </div>
        <div className="flex justify-start">
          <Image
            src="/machine1.jpg"
            width={400}
            height={500}
            alt="Machine large"
            className="object-cover"
          />
        </div>
        </div>
        <div className="flex flex-col justify-center text-center md:text-left space-y-4">
          <h5 className="text-xl uppercase font-medium text-main">
            ━━ About Us
          </h5>
          <h2 className="md:text-7xl text-4xl font-bold lg:max-w-48 text-gray-800">
            Providing Maintenance for{" "}
            <span className="text-main">Machinery</span>
          </h2>
          <p className="text-gray-600 md:max-w-lg md:text-base text-sm">
            Team is a diverse network of consultants and industry professionals
            with a global mindset and a collaborative culture.
          </p>
          <button className="bg-main text-white md:mr-0 mr-auto md:ml-0 ml-auto w-full max-w-48 py-2 rounded-lg shadow-md hover:bg-main-300">
            ━━ Read More
          </button>
        </div>
      </div>
      <div className="w-full h-80 bg-main flex justify-center items-center">
        <div className="grid grid-cols-2 gap-10 items-center w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <div className="relative">
              <p className="text-white absolute left-1/2 transform -translate-x-1/2 top-5 sm:top-9 whitespace-nowrap">
                years of experience
              </p>
              <h2 className="text-7xl sm:text-8xl font-extrabold text-red-500 text-center">
                10+
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <p className="text-white absolute left-1/2 transform -translate-x-1/2 top-5 sm:top-9 whitespace-nowrap">
                machinery expertise
              </p>
              <h2 className="text-7xl sm:text-8xl font-extrabold text-red-500 text-center">
                100+
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1">
        <div className="flex flex-col p-5 sm:p-8 md:p-12 h-72 md:h-96 border-r border-gray-300 transition-all duration-300 hover:bg-gray-200 hover:text-main relative group">
          <h3 className="text-base md:text-xl font-semibold mb-2">
            Monitoring and Diagnostics
          </h3>
          <p className="text-sm md:text-base">
            Regularly assess the condition of machinery through advanced
            diagnostic tools, vibration analysis, thermography, and oil analysis
            to detect early signs of wear and tear, ensuring optimal performance
            and minimizing downtime.
          </p>
          <ClipboardList className="w-12 h-12 text-main absolute bottom-4 left-4 sm:left-auto sm:right-4 transition-transform duration-300 group-hover:scale-150 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]" />
        </div>
        <div className="flex flex-col p-5 sm:p-8 md:p-12 h-72 md:h-96 border-r border-gray-300 transition-all duration-300 hover:bg-gray-200 hover:text-main relative group">
          <h3 className="text-base md:text-xl font-semibold mb-2">
            Preventive Maintenance Planning:
          </h3>
          <p className="text-sm md:text-base">
            Develop and implement preventive maintenance schedules and programs
            to maximize equipment lifespan and reliability, reducing the risk of
            unplanned failures and expensive repairs.
          </p>
          <ShieldPlus className="w-12 h-12 text-main absolute bottom-4 right-4 transition-transform duration-300 group-hover:scale-150 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]" />
        </div>
        <div className="flex flex-col p-5 sm:p-8 md:p-12 h-72 md:h-96 border-r border-gray-300 transition-all duration-300 hover:bg-gray-200 hover:text-main relative group">
          <h3 className="text-base md:text-xl font-semibold mb-2">
            Data Analysis and Reporting:
          </h3>
          <p className="text-sm md:text-base">
            Analyze machinery data collected from sensors and monitoring
            equipment, identifying trends and patterns to predict potential
            failures and generate actionable reports for improving machine
            efficiency.
          </p>
          <ChartSpline className="w-12 h-12 text-main gray-700 absolute bottom-4 left-4 sm:left-auto sm:right-4 transition-transform duration-300 group-hover:scale-150 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]" />
        </div>
        <div className="flex flex-col p-5 sm:p-8 md:p-12 h-72 md:h-96 transition-all duration-300 hover:bg-gray-200 hover:text-main relative group">
          <h3 className="text-base md:text-xl font-semibold mb-2">
            Root Cause Analysis and Problem Solving
          </h3>
          <p className="text-sm md:text-base">
            Investigate machine failures and faults, identifying root causes to
            recommend corrective actions, and collaborate with maintenance teams
            to resolve issues and implement solutions that enhance machine
            reliability.
          </p>
          <BrainCog className="w-12 h-12 text-main absolute bottom-4 right-4 transition-transform duration-300 group-hover:scale-150 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]" />
        </div>
      </div>
    </div>
  );
};

export default About;
