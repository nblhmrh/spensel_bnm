"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/pages/Card";
import axios from "axios";

// NewsCard Component
const NewsCard = ({ news }) => (
  <div
    key={news.id}
    className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 
      hover:scale-[1.02] hover:shadow-2xl group w-full max-w-md mx-auto"
  >
    <Link href={`/Berita/${news.slug}`}>
      <div className="relative overflow-hidden aspect-video">
        <img
          src={`http://localhost:8000/storage/${news.foto}`}
          alt={news.judul}
          className="w-full h-full object-cover transition-transform duration-700 
            group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 
          opacity-100 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300
          translate-y-0 group-hover:translate-y-[-5px]">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold tracking-wide line-clamp-2">
            {news.judul}
          </h3>
        </div>
      </div>
    </Link>
  </div>
);

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/berita");
        setNewsData(response.data);
      } catch {
        setNewsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBerita();
  }, []);

  return (
    <>
      <div className="bg-[#154472] w-full min-h-screen flex flex-col items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="w-full max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white animate-fadeIn transition-all duration-500 
            hover:scale-105 hover:tracking-wider px-4">
            BERITA TERKINI
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white animate-slideUp transition-all duration-500 
            hover:tracking-wide px-4">
            UPT SMP NEGERI 9 BINAMU
          </h2>
        </div>

        {/* News Grid Section */}
        <div className="w-full max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-white py-10 text-lg sm:text-xl">
              Memuat berita...
            </div>
          ) : newsData.length === 0 ? (
            <div className="text-center text-white py-10 text-lg sm:text-xl">
              Tidak ada berita.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {newsData.slice(0, 4).map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}
        </div>

        {/* View More Button */}
        <Link href="/Berita">
          <button className="mt-12 sm:mt-16 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white 
            rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform 
            hover:bg-white hover:text-[#154472] hover:shadow-lg hover:shadow-white/20 animate-fadeIn 
            hover:scale-105">
            Selengkapnya
          </button>
        </Link>
      </div>
      <Card />
    </>
  );
}

export default News;
