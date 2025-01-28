import React from "react";
import { MapPinned, Mail, PhoneCall } from "lucide-react";

const Contacts = () => {
  return (
    <div className="h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <div className="w-full">
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
      <div className="w-screen h-56 bg-main flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8 text-center px-4">
          <div className="flex flex-col items-center">
            <MapPinned className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl text-white font-semibold mb-4">Address</h3>
            <p className="text-white">
              78 pioneer Rd <br />
              Hunterview NSW 2330 <br />
              Australia
            </p>
          </div>
          <div className="flex flex-col items-center">
            <PhoneCall className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl text-white font-semibold mb-4">Phone</h3>
            <p className="text-white">+61 466 367 629</p>
          </div>
          <div className="flex flex-col items-center">
            <Mail className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl text-white font-semibold mb-4">Email</h3>
            <p className="text-white">
              ryan.java@javaconditionmonitoring.com.au
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
