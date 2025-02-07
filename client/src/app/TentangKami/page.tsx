"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
// import Image from "next/image";
import { FaClipboardList, FaUsers, FaCertificate, FaNewspaper, FaBuilding, FaTrophy } from "react-icons/fa";
import News from "@/pages/News";

function Index() {
  const sections = [
    { title: "Visi & Misi", link: "/visi-misi", icon: <FaClipboardList size={50} className="text-blue-900" /> },
    { title: "Struktur Organisasi", link: "/struktur", icon: <FaUsers size={50} className="text-blue-900" /> },
    { title: "Akreditasi", link: "/akreditasi", icon: <FaCertificate size={50} className="text-blue-900" /> },
    { title: "Berita Terkini", link: "/berita-terkini", icon: <FaNewspaper size={50} className="text-blue-900" /> },
    { title: "Fasilitas", link: "/fasilitas", icon: <FaBuilding size={50} className="text-blue-900" /> },
    { title: "Prestasi", link: "/prestasi", icon: <FaTrophy size={50} className="text-blue-900" /> },
  ];
  
  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Tentang Kami
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/TentangKami"
              className="underline hover:text-gray-300"
            >
              Tentang Kami
            </Link>{" "}
          </p>
        </section>
      </div>

      <div className="max-w-5xl mx-auto py-10 px-5">
      {/* Header */}
      <div className="text-center border-2 border-gray-500 p-4 rounded-full bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-900">
          Mengenal UPT SMPN 9 Binamu Lebih dari Sekedar Sekolah
        </h1>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {sections.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="bg-gray-100 p-6 rounded-lg flex flex-row items-center cursor-pointer hover:bg-gray-200 transition shadow-lg pl-20">
              {item.icon}
              <p className="text-lg font-semibold mt-2 text-blue-900 px-4">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <News/>
    </>
  );
}

export default Index;
