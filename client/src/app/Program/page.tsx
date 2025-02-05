"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";

function Index() {
  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Program
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/Program" className="underline hover:text-gray-300">
              Program
            </Link>{" "}
          </p>
        </section>
      </div>

      <div className="px-6 pb-20 pt-10">
        <h1 className="text-[#154472] text-3xl font-bold py-4 text-center">
          Selamat Datang di Layanan Sekolah Kami! <br /> Kami Hadir untuk
          Membantu Anda
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            "Kurikulum",
            "Peraturan & Tata tertib",
            "Ekstrakurikuler",
            "Parenting siswa/i",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg p-6 shadow-md flex items-center justify-center"
            >
              <Link href={`/${'P-'+title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="bg-[#92B4EC] px-6 py-3 rounded-full text-blue-900 font-bold text-lg hover:bg-white transition-all">
                  {title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <News/>
    </>
  );
}

export default Index;
