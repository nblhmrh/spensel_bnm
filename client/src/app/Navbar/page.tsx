"use client"; // Menandai bahwa ini adalah komponen client-side

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png"; // Import gambar


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-end items-center px-6 text-white bg-[#154472] shadow-md">
      <div className="flex items-center mr-auto">
        <Image src={logo} alt="Logo Sekolah" width={100} height={100} />
      </div>

      {/* Menu Desktop */}
      <ul className="hidden md:flex space-x-7">
        <li>
          <button 
          onClick={() => router.push("/")} 
          className="hover:text-gray-300 font-medium"
          type="button">
            Beranda
          </button>
        </li>
        <li>
          <button 
          onClick={() => router.push("/TentangKami")} className="hover:text-gray-300 font-medium"
          type="button">
            Tentang Kami
          </button>
        </li>
        <li>
          <button onClick={() => router.push("/BK")} className="hover:text-gray-300 font-medium">
            BK
          </button>
        </li>
        <li>
          <button onClick={() => router.push("/Program")} className="hover:text-gray-300 font-medium">
            Program
          </button>
        </li>
        <li>
          <button onClick={() => router.push("/PPDB")} className="hover:text-gray-300 font-medium">
            PPDB
          </button>
        </li>
      </ul>

      {/* Hubungi Kami Button */}
      <div className="hidden md:block">
        <button
          onClick={() => router.push("/HubungiKami")}
          className="ml-9 mr-11 px-4 py-2 bg-white text-blue-800 font-semibold border rounded-full hover:bg-gray-200"
        >
          Hubungi Kami
        </button>
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
            <button onClick={() => router.push("/")} className="hover:text-white">
              Beranda
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/tentang")} className="hover:text-white">
              Tentang Kami
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/bk")} className="hover:text-white">
              BK
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/program")} className="hover:text-white">
              Program
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/ppdb")} className="hover:text-white">
              PPDB
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/HubungiKami")}
              className="px-4 py-2 bg-white text-blue-800 font-semibold rounded-lg hover:bg-gray-200"
            >
              Hubungi Kami
            </button>
          </li>
        </ul>
      )}
    </nav>
    <div className="py-16">

    </div>
    </div>
 
  );
}

export default Navbar;
