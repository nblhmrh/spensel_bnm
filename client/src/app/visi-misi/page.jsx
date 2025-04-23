"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";

export default function VisiMisi() {
  const [data, setData] = useState({ visi: "", misi: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/visi-misi")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="bg-[#154472]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Visi & Misi
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className="hover:text-gray-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link href="/visi-misi" className="hover:text-gray-300">
              Visi & Misi
            </Link>
          </p>
        </section>
      </div>

      <div className="relative bg-gray-200">
        {/* Wave SVG at the top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 320" className="w-full h-88">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <h1 className="text-2xl font-bold text-center z-0 text-[#154472] mt-28 ">
            VISI & MISI UPT SMPN 9 BINAMU JENEPONTO
          </h1>

          <div className="mt-20 space-y-8 ">
            {/* Visi Section */}
            <div className="bg-[#154472] rounded-lg p-8 relative">
              <h2 className="text-3xl font-bold text-white mb-6">Visi</h2>
              <div className="text-white">
                <div
                  className="text-sm leading-relaxed "
                  dangerouslySetInnerHTML={{ __html: data.visi }}
                />
              </div>
            </div>

            {/* Misi Section */}
            <div className="bg-[#154472] rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Misi</h2>
              <div className="text-white">
                <div
                  className="text-sm leading-relaxed mb-16"
                  dangerouslySetInnerHTML={{ __html: data.misi }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 h-36"></div>

        {/* Wave SVG at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
          <svg viewBox="0 0 1440 325" className="w-full h-79">
            <path
              fill="#154472"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>
      <News />
    </>
  );
}
