import React from "react";
import { MapPinned, Mail, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-12">
      <div className="container mx-auto grid grid-cols-3 gap-8 items-start">
        <div className="flex items-center">
          <Image
            src="/logoo.png"
            alt="Logo"
            width={62}
            height={62}
            className="mr-2 w-auto h-auto"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#about">
                <p className="text-sm hover:underline">About Us</p>
              </Link>
            </li>
            <li>
              <Link href="#services">
                <p className="text-sm hover:underline">Services</p>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <MapPinned className="w-5 h-5 text-white" />
              <span className="text-sm">
                78 Pioneer Rd, Hunterview NSW 2330, Australia
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-white" />
              <span className="text-sm">+61 466 367 629</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-white" />
              <span className="text-sm">
                ryan.java@javaconditionmonitoring.com.au
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-gray-600 pt-4 text-center text-sm">
        © 2025 All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
