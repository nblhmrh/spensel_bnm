"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
import Card from '@/pages/Card'
// Import gambar dari folder assets
import lynan1 from "@/assets/lynan1.png";
import lynan2 from "@/assets/lynan2.png";
import lynan3 from "@/assets/lynan3.png";
import lynan4 from "@/assets/lynan4.png";
import lynan5 from "@/assets/lynan5.png";
import bk from "@/assets/bk.png";


const newsData = [
  { id: 1, title: "Kegiatan Literasi", image: lynan1, link: "/Berita1" },
  { id: 2, title: "Penyerahan Piala", image: lynan2, link: "/Berita2" },
  { id: 3, title: "Siswa Berprestasi", image: lynan3, link: "/Berita3" },
  { id: 4, title: "Kegiatan Sekolah", image: lynan4, link: "/Berita4" },
  { id: 5, title: "Lomba Akademik", image: lynan5, link: "/Berita5" },
  { id: 6, title: "Pentas Seni", image: bk, link: "/Berita6" },
];

function Berita() {
  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            Berita Terkini
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className=" hover:text-gray-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/Berita"
              className=" hover:text-gray-300"
            >
              Berita 
            </Link>
          </p>
        </section>
      </div>

      <div className="px-8 pb-20 pt-10">
        <h1 className="text-white bg-[#154472] rounded-full text-2xl font-bold py-5 text-center">
          Selamat datang di UPT SMPN 9 Binamu News! Kami hadir untuk menyajikan
          informasi terkini seputar kegiatan, prestasi, dan perkembangan di
          sekolah kita.
        </h1>
        <h2 className="text-[#154472] text-4xl font-bold py-2 pt-8 text-center">
          UPT SMP NEGERI 9 BINAMU JENEPONTO
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6 pb-16">
        {newsData.map((news) => (
          <div key={news.id} className="relative group">
            <Link href={news.link}>
              <Image
                src={news.image}
                alt={news.title}
                className="w-full h-[250px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-white text-xl font-bold">
                {news.title}
              </div>
            </Link>
            <Link
              href={news.link}
              className="absolute top-2 right-2 bg-gray-800 rounded-full p-2 shadow-md hover:bg-[#154472]"
            >
              ➤
            </Link>
          </div>
        ))}
      </div>
      <Card/>
    </>
  );
}

export default Berita;
