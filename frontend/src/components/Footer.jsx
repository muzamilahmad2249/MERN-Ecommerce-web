import React from "react";
import footerlogo from "../assets/logo_big.png";
import instagram from "../assets/instagram_icon.png";
import pintester from "../assets/pintester_icon.png";
import whatsapp from "../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 border-t border-gray-200">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <img
            src={footerlogo}
            alt="Shopper Logo"
            className="mx-auto mb-4"
            style={{ height: "50px" }}
          />
        </div>
        <nav className="flex justify-center space-x-8 mb-4">
          <a href="#" className="text-black hover:text-gray-600 bold-10">
            Company
          </a>
          <a href="#" className="text-black hover:text-gray-600 bold-10">
            Products
          </a>
          {/* <a href="#" className="text-black hover:text-gray-600 bold-10">
            Offices
          </a> */}
          <a href="#" className="text-black hover:text-gray-600 bold-10">
            About
          </a>
          <a href="#" className="text-black hover:text-gray-600 bold-10">
            Contact
          </a>
        </nav>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#">
            <img src={instagram} alt="Instagram" className="h-6" />
          </a>
          <a href="#">
            <img src={pintester} alt="Pinterest" className="h-6" />
          </a>
          <a href="#">
            <img src={whatsapp} alt="WhatsApp" className="h-6" />
          </a>
        </div>
        <p className="text-black bold-10">
          Copyright © 2024 - All Rights Reserved: Muzamil
        </p>
      </div>
    </footer>
  );
};

export default Footer;
