"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/TentangKami", label: "Tentang Kami" },
    { path: "/BK", label: "BK" },
    { path: "/Program", label: "Program" },
    { path: "/PPDB", label: "PPDB" },
  ];

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#154472] shadow-md transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
              <Image src={logo} alt="Logo Sekolah" width={80} height={80} className="w-auto h-12 md:h-16" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className="text-white hover:text-gray-300 font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => router.push("/HubungiKami")}
                className="ml-4 px-6 py-2 bg-white text-[#154472] font-semibold rounded-full transition-all duration-500 relative overflow-hidden group hover:scale-105"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Hubungi Kami
                </span>
                <div className="absolute inset-0 bg-[#154472] transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-yellow-300 text-2xl p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden bg-[#154472]`}
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setIsOpen(false);
                }}
                className="w-full text-left py-3 px-4 text-white hover:text-yellow-400 hover:bg-[#1a5288] rounded-lg transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                router.push("/HubungiKami");
                setIsOpen(false);
              }}
              className="w-full py-3 px-4 mt-2 bg-white text-[#154472] font-semibold rounded-lg transition-all duration-300 hover:bg-gray-100"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </nav>
      <div className="h-16 md:h-20" />
    </div>
  );
}

export default Navbar;
