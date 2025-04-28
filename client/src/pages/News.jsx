"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from '@/pages/Card'
// Import gambar dari folder assets
import lynan1 from "@/assets/lynan1.png";
import lynan2 from "@/assets/lynan2.png";
import lynan3 from "@/assets/lynan3.png";
import lynan4 from "@/assets/lynan4.png";

const newsData = [
  { 
    id: 1, 
    image: lynan1, 
    link: "/Berita1",
    title: "Pertemuan Orang Tua Siswa Kelas IX"
  },
  { 
    id: 2, 
    image: lynan2, 
    link: "/Berita2",
    title: "Kegiatan Literasi Digital"
  },
  { 
    id: 3, 
    image: lynan3, 
    link: "/Berita3",
    title: "Pelatihan Guru dan Staff"
  },
  { 
    id: 4, 
    image: lynan4, 
    link: "/Berita4",
    title: "Program Pengembangan Karakter"
  },
];

function News() {
  return (
    <>
    <div className="bg-[#154472] w-full min-h-screen flex flex-col items-center py-4 pb-16 px-4">
      {/* Header */}
      <h1 className="text-xl md:text-5xl font-bold text-white text-center py-5 animate-fadeIn transition-all duration-500 hover:scale-105 hover:tracking-wider">
        BERITA TERKINI
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-14 animate-slideUp transition-all duration-500 hover:tracking-wide">
        UPT SMP NEGERI 9 BINAMU
      </h2>

      {/* News Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-screen-lg animate-fadeIn">
        {newsData.map((news, index) => (
          <div
            key={news.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 
            hover:scale-[1.02] hover:shadow-2xl group"
          >
            <Link href={news.link}>
              <div className="relative overflow-hidden">
                <Image
                  src={news.image}
                  alt={`News ${news.id}`}
                  className="w-full h-48 object-cover transition-transform duration-700 
                  group-hover:scale-110 group-hover:rotate-1"
                  width={400}
                  height={250}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-100 transition-opacity duration-300 
                group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300
                translate-y-0 group-hover:translate-y-[-5px]">
                  <h3 className="text-lg font-semibold tracking-wide">
                    {news.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Tombol Selengkapnya */}
      <Link href="/Berita">
        <button className="mt-8 px-6 py-3 border-2 border-white text-white rounded-full font-semibold 
        transition-all duration-300 transform hover:bg-white hover:text-[#154472] 
        hover:shadow-lg hover:shadow-white/20 animate-fadeIn">
          Selengkapnya
        </button>
      </Link>
    </div>
    <Card/>
    </>
  );
}

export default News;
