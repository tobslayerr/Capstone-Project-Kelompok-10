import React from 'react';
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
        <h1 className='font-bold text-white text-xl'>SiEvent</h1>
        </div>

        <div className="flex flex-col md:items-start items-center w-full">
         <div className="flex space-x-5 text-lg mb-5">
            <FaFacebook className="cursor-pointer  text-white hover:text-gray-600 transition" />
            <FaXTwitter className="cursor-pointer text-white hover:text-gray-600 transition" />
            <FaLinkedin className="cursor-pointer text-white hover:text-gray-600 transition" />
            <FaInstagram className="cursor-pointer text-white hover:text-gray-600 transition" />
          </div>
          <ul className="flex md:flex-col  w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>

        <div className="md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Email Kami</h2>
          <p className="text-sm text-white/80">Ingin Mengirim email untuk hal tertentu silahkan masukkan email!</p>
          <div className="flex items-center gap-2 pt-4">
            <input className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm" type="email" placeholder="Enter your email" />
            <button className="bg-blue-600 w-24 h-9 text-white rounded">Subscribe</button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">Copyright 2025 &copy; SIEvent, All Right Reserved</p>
    </footer>
  );
};

export default Footer;
