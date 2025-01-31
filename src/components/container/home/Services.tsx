import React from "react";
import Image from "next/image";

const Services = () => {
  return (
    <div>
      <div className="h-screen">
        <div className="w-screen h-screen grid grid-cols-[2fr_3fr] gap-28 items-center py-16 px-10">
          <div className="flex justify-end">
            <Image
              src="/machine1.jpg"
              width={450}
              height={550}
              alt="Machine large"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center text-center md:text-left space-y-4">
            <h5 className="text-xl uppercase font-medium text-main">
              ━━ Why Choose Us
            </h5>
            <h2 className="text-5xl font-bold max-w-xl text-gray-800 leading-normal">
              Providing Maintenance for{" "}
              <span className="text-main">Machinery</span>
            </h2>
            <p className="text-gray-600] max-w-lg">
              Team is a diverse network of consultants and industry
              professionals with a global mindset and a collaborative culture.
            </p>
            <div className="flex justify-center">
              <Image
                src="/machin2.jpg"
                width={300}
                height={450}
                alt="Machine small"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-main flex flex-col justify-center items-center text-white p-4">
        {/* Centered Title */}
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>

        {/* List of Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Service 1 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">Machine Health Monitoring</h2>
          </div>

          {/* Service 2 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">Preventive Maintenance</h2>
          </div>

          {/* Service 3 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">Vibration Analysis</h2>
          </div>

          {/* Service 4 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">
              Lubrication and Fluid Management
            </h2>
          </div>

          {/* Service 5 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">Thermography Inspection</h2>
          </div>

          {/* Service 6 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">Root Cause Analysis</h2>
          </div>

          {/* Service 7 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">
              Condition-Based Monitoring
            </h2>
          </div>

          {/* Service 8 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">
              Machine Calibration and Optimization
            </h2>
          </div>

          {/* Service 9 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold">Emergency Repairs</h2>
          </div>

          {/* Service 10 */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center col-span-full sm:col-span-2 lg:col-span-1 lg:col-start-2">
            <h2 className="text-xl font-semibold">Training & Consultation</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
