"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import { FaUserCircle, FaClipboardList, FaCamera, FaHeadset, FaFolderOpen } from "react-icons/fa";
import News from "@/pages/News";
const layanan = [
  { title: "Profil BK", icon: <FaUserCircle />, link: "/B-Profil" },
  { title: "Asesmen BK", icon: <FaClipboardList />, link: "/B-Asesmen" },
  { title: "Layanan Pengaduan", icon: <FaHeadset />, link: "/layanan-pengaduan" },
  { title: "Dokumentasi BK", icon: <FaCamera />, link: "/dokumentasi-bk" },
  { title: "Layanan BK", icon: <FaFolderOpen />, link: "/layanan-bk" },
  
];

export default function LayananBK() {
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-left">
            Bimbingan & Konseling
          </h1>
          <p className="text-white mt-2 py-3 font-normal text-left">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/BK" className="underline hover:text-gray-300">
              BK
            </Link>
          </p>
        </section>
      </div>

      {/* Header Layanan */}
      <div className="flex justify-center mt-10">
        <div className="bg-[#154472] text-white py-3 px-6 text-2xl font-semibold rounded-full shadow-lg">
          Layanan BK Temanmu dalam Menjelajahi Diri
        </div>
      </div>

      {/* Grid Layanan */}
      <div className="flex justify-center flex-wrap gap-6 mt-10 px-6 py-24">
        {layanan.map((item, index) => (
          <Link href={item.link} key={index} className="group">
            <div className="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center w-[180px] transition-all duration-300 hover:bg-gray-200">
              <div className="bg-[#154472] text-white p-4 rounded-full text-3xl flex items-center justify-center w-[60px] h-[60px]">
                {item.icon}
              </div>
              <p className="mt-3 text-[#154472] font-semibold text-center">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <News/>
    </>
  );
}
