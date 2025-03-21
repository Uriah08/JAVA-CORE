import React from "react";
import { MapPinned, Mail, PhoneCall } from "lucide-react";

const Contacts = () => {
  return (
    <div className="py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-5 lg:px-14">
      <div className="col-span-1 flex justify-center items-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.311302444939!2d151.17959216430432!3d-32.5405723477721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b0cafb4489e6d63%3A0xc532bb61beba61b4!2s78%20Pioneer%20Rd%2C%20Hunterview%20NSW%202330%2C%20Australia!5e0!3m2!1sen!2sph!4v1738051710813!5m2!1sen!2sph"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="col-span-1  p-8 flex flex-col justify-start">
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-8">
          Contact Us
        </h2>
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <MapPinned className="w-10 h-10 text-gray-900" />
            <div className="flex flex-col">
              <h3 className="lg:text-xl text-gray-900 font-semibold mb-2 text-base">
                Address
              </h3>
              <p className="text-gray-900 lg:text-base text-xs">
                78 Pioneer Rd <br />
                Hunterview NSW 2330 <br />
                Australia
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <PhoneCall className="w-10 h-10 text-gray-900" />
            <div className="flex flex-col">
              <h3 className="lg:text-xl text-gray-900 font-semibold mb-2 text-base">
                Phone
              </h3>
              <a
                href="tel:+61466367629"
                className="text-gray-900 lg:text-base text-xs hover:underline"
              >
                +61 466 367 629
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Mail className="w-10 h-10 text-gray-900" />
            <div className="flex flex-col">
              <h3 className="lg:text-xl text-gray-900 font-semibold mb-2 text-base">
                Email
              </h3>
              <a
                href="mailto:ryan.java@javaconditionmonitoring.com.au"
                className="text-gray-900 lg:text-base text-xs hover:underline"
              >
                ryan.java@javaconditionmonitoring.com.au
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
