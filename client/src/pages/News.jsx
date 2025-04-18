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
  { id: 1, image: lynan1, link: "/Berita1" },
  { id: 2, image: lynan2, link: "/Berita2" },
  { id: 3, image: lynan3, link: "/Berita3" },
  { id: 4, image: lynan4, link: "/Berita4" },
];

function News() {
  return (
    <>
    <div className="bg-[#154472] w-full min-h-screen flex flex-col items-center py-10 px-4">
      {/* Header */}
      <h1 className="text-xl md:text-4xl font-bold text-white text-center py-4">
        BERITA TERKINI
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        UPT SMP NEGERI 9 BINAMU
      </h2>

      {/* News Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-screen-lg">
        {newsData.map((news, index) => (
          <div
            key={news.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
          >
            {/* Gambar */}
            <Link href={news.link}>
              <Image
                src={news.image}
                alt={`News ${news.id}`}
                className="w-full h-48 object-cover"
                width={400}
                height={250}
                priority
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Tombol Selengkapnya */}
      <Link href="/Berita">
        <button className="mt-8 px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#154472] transition-all duration-300">
          Selengkapnya
        </button>
      </Link>
    </div>
    <Card/>
    </>
  );
}


export default News;
