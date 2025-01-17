"use client"; // Menandai bahwa ini adalah komponen client-side

import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png"; // Import gambar

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-end items-center px-6 py-4">
      {/* Logo */}
      <div className="flex items-center mr-auto">
        {" "}
        {/* Memberikan margin otomatis untuk mendorong logo ke kiri */}
        <Image src={logo} alt="Logo Sekolah" width={85} height={85} />
      </div>

      {/* Menu Desktop */}
      <ul className="hidden md:flex space-x-7 text-[#ffff]">
        <li>
          <a href="#beranda" className="hover:text-white font-medium">
            Beranda
          </a>
        </li>
        <li>
          <a href="#tentang" className="hover:text-white font-medium">
            Tentang Kami
          </a>
        </li>
        <li>
          <a href="#bk" className="hover:text-white font-medium">
            BK
          </a>
        </li>
        <li>
          <a href="#program" className="hover:text-white font-medium">
            Program
          </a>
        </li>
        <li>
          <a href="#ppdb" className="hover:text-white font-medium">
            PPDB
          </a>
        </li>
      </ul>

      {/* Hubungi Kami Button */}
      <div className="hidden md:block">
        <a
          href="#hubungi-kami"
          className="ml-9 mr-11 px-4 py-2 bg-white text-blue-800 font-semibold border rounded-full hover:bg-gray-200"
        >
          Hubungi Kami
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-yellow-300"
        onClick={() => setIsOpen(!isOpen)} // Toggle menu
      >
        ☰
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-blue-800 text-yellow-300 flex flex-col items-center space-y-4 py-4 md:hidden">
          <li>
            <a href="#beranda" className="hover:text-white">
              Beranda
            </a>
          </li>
          <li>
            <a href="#tentang" className="hover:text-white">
              Tentang Kami
            </a>
          </li>
          <li>
            <a href="#bk" className="hover:text-white">
              BK
            </a>
          </li>
          <li>
            <a href="#program" className="hover:text-white">
              Program
            </a>
          </li>
          <li>
            <a href="#ppdb" className="hover:text-white">
              PPDB
            </a>
          </li>
          <li>
            <a
              href="#hubungi-kami"
              className="px-4 py-2 bg-white text-blue-800 font-semibold rounded-lg hover:bg-gray-200"
            >
              Hubungi Kami
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
