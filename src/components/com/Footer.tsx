import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = ["Home", "About", "Delivery", "Privacy Policy"];

  return (
    <footer className="bg-gray-50 px-6 pt-16 pb-8 mt-32 border-t text-gray-700">
      <div className="max-w-6xl mx-auto grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Logo and Description */}
        <div className="text-center sm:text-left">
          <img src={assets.logo} alt="Logo" className="mb-4 w-32 mx-auto sm:mx-0" />
          <p className="text-sm text-gray-600 max-w-sm mx-auto sm:mx-0">
            Discover quality and convenience with our curated selection. We're dedicated to customer satisfaction and a smooth shopping experience.
          </p>
        </div>

        {/* Company Links */}
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold mb-4">COMPANY</p>
          <ul className="flex flex-col gap-2 text-sm">
            {companyLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-black hover:underline transition duration-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold mb-4">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>+20 1102893016</li>
            <li>112003mesa@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-200 pt-6">
        <p className="text-center text-sm text-gray-500">
          &copy; {currentYear} forever.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
