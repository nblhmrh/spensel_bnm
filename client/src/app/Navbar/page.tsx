"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-end items-center px-6 text-white bg-[#154472] shadow-md transition-all duration-300 ease-in-out">
        <div className="flex items-center mr-auto transform hover:scale-105 transition-transform duration-300">
          <Image src={logo} alt="Logo Sekolah" width={100} height={100} />
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-7">
          <li className="transform hover:scale-105 transition-all duration-300">
            <button 
              onClick={() => router.push("/")} 
              className="hover:text-gray-300 font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 transition-colors duration-300"
              type="button">
              Beranda
            </button>
          </li>
          <li className="transform hover:scale-105 transition-all duration-300">
            <button 
              onClick={() => router.push("/TentangKami")} 
              className="hover:text-gray-300 font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              type="button">
              Tentang Kami
            </button>
          </li>
          <li className="transform hover:scale-105 transition-all duration-300">
            <button 
              onClick={() => router.push("/BK")} 
              className="hover:text-gray-300 font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              BK
            </button>
          </li>
          <li className="transform hover:scale-105 transition-all duration-300">
            <button 
              onClick={() => router.push("/Program")} 
              className="hover:text-gray-300 font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Program
            </button>
          </li>
          <li className="transform hover:scale-105 transition-all duration-300">
            <button 
              onClick={() => router.push("/PPDB")} 
              className="hover:text-gray-300 font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              PPDB
            </button>
          </li>
        </ul>

        {/* Hubungi Kami Button */}
        <div className="hidden md:block">
          <button
            onClick={() => router.push("/HubungiKami")}
            className="ml-9 mr-11 px-4 py-2 bg-white text-[#154472] font-semibold border-2 border-white rounded-full transition-all duration-500 ease-in-out relative overflow-hidden group hover:scale-110"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              Hubungi Kami
            </span>
            <div className="absolute inset-0 bg-[#154472] transform rotate-180 scale-0 transition-transform duration-500 ease-in-out group-hover:rotate-0 group-hover:scale-100"></div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-300 transform transition-all duration-300 ease-in-out hover:scale-110 hover:text-yellow-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`transition-all duration-300 ${isOpen ? 'rotate-90 text-yellow-400' : ''}`}>
            ☰
          </div>
        </button>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-16 left-0 w-full md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <ul className="bg-blue-800 text-yellow-300 flex flex-col items-center space-y-4 py-4 shadow-lg">
            <li className="w-full text-center transform hover:scale-105 transition-all duration-300">
              <button onClick={() => router.push("/")} className="w-full py-2 transition-all duration-300 hover:text-white hover:bg-blue-900">
                Beranda
              </button>
            </li>
            <li className="w-full text-center transform hover:scale-105 transition-all duration-300">
              <button onClick={() => router.push("/tentang")} className="w-full py-2 hover:text-white hover:bg-blue-900 transition-colors duration-300">
                Tentang Kami
              </button>
            </li>
            <li className="w-full text-center transform hover:scale-105 transition-all duration-300">
              <button onClick={() => router.push("/bk")} className="w-full py-2 hover:text-white hover:bg-blue-900 transition-colors duration-300">
                BK
              </button>
            </li>
            <li className="w-full text-center transform hover:scale-105 transition-all duration-300">
              <button onClick={() => router.push("/program")} className="w-full py-2 hover:text-white hover:bg-blue-900 transition-colors duration-300">
                Program
              </button>
            </li>
            <li className="w-full text-center transform hover:scale-105 transition-all duration-300">
              <button onClick={() => router.push("/ppdb")} className="w-full py-2 hover:text-white hover:bg-blue-900 transition-colors duration-300">
                PPDB
              </button>
            </li>
            <li className="w-full text-center px-4">
              <button
                onClick={() => router.push("/HubungiKami")}
                className="px-4 py-2 bg-white text-[#154472] font-semibold border-2 border-white rounded-lg w-64 transition-all duration-500 ease-in-out relative overflow-hidden group hover:scale-110"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Hubungi Kami
                </span>
                <div className="absolute inset-0 bg-[#154472] transform rotate-180 scale-0 transition-transform duration-500 ease-in-out group-hover:rotate-0 group-hover:scale-100"></div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="py-16">
      </div>
    </div>
  );
}

export default Navbar;
