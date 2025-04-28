"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import { FaUserCircle, FaClipboardList, FaCamera, FaHeadset, FaFolderOpen } from "react-icons/fa";
import News from "@/pages/News";
const layanan = [
  { title: "Profil BK", icon: <FaUserCircle />, link: "/B-Profil" },
  { title: "Asesmen BK", icon: <FaClipboardList />, link: "/B-Asesmen" },
  { title: "Dokumentasi BK", icon: <FaCamera />, link: "/B-Dokumentasi" },
  { title: "Layanan BK", icon: <FaFolderOpen />, link: "/B-Layanan" },
   { title: "Pengaduan", icon: <FaHeadset />, link: "/B-Pengaduan" },
];

export default function LayananBK() {
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-[#154472] w-full h-[300px] transition-all duration-300">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-left">
            Bimbingan & Konseling
          </h1>
          <p className="text-white mt-2 py-3 font-normal text-left">
            <Link href="/" className="transition-colors duration-300 hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/BK" className="transition-colors duration-300 hover:text-gray-300">
              BK
            </Link>
          </p>
        </section>
      </div>

      {/* Header Layanan */}
      <div className="flex justify-center mt-10">
        <div className="bg-[#154472] text-white py-3 px-6 text-2xl font-semibold rounded-full shadow-lg transform transition-all duration-500 hover:scale-105 animate-slideUp">
          Layanan BK Temanmu dalam Menjelajahi Diri
        </div>
      </div>

      {/* Grid Layanan */}
      <div className="flex justify-center flex-wrap gap-6 px-6 py-12">
        {layanan.map((item, index) => (
          <Link href={item.link} key={index} className="group animate-fadeIn" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center w-[180px] transform transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
              <div className="bg-[#154472] text-white p-4 rounded-full text-3xl flex items-center justify-center w-[60px] h-[60px] transform transition-all duration-300 group-hover:rotate-12">
                {item.icon}
              </div>
              <p className="mt-3 text-[#154472] font-semibold text-center transition-colors duration-300 group-hover:text-[#1a5a99]">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Wave SVG wrapper */}
      <div className="relative w-full">
        <svg viewBox="0 0 1440 200" className="w-full h-70 rotate-180 animate-wave">
          <path
            fill="#154472"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <News/>
    </>
  );
}
