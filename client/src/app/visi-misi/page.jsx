"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import { motion } from "framer-motion";

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
      <motion.div 
        className="bg-[#154472]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <motion.section 
          className="flex flex-col py-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins tracking-wide">
            Visi & Misi
          </h1>
          <p className="text-white mt-2 py-3 font-normal font-inter">
            <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className="hover:text-gray-300 transition-colors duration-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link href="/visi-misi" className="hover:text-gray-300 transition-colors duration-300">
              Visi & Misi
            </Link>
          </p>
        </motion.section>
      </motion.div>

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
          <motion.h1 
            className="text-2xl font-bold text-center z-0 text-[#154472] mt-28 font-poppins tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            VISI & MISI UPT SMPN 9 BINAMU JENEPONTO
          </motion.h1>

          <div className="mt-20 space-y-8">
            {/* Visi Section */}
            <motion.div 
              className="bg-[#154472] rounded-lg p-8 relative transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 font-poppins">Visi</h2>
              <motion.div 
                className="text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div
                  className="text-sm leading-relaxed font-inter"
                  dangerouslySetInnerHTML={{ __html: data.visi }}
                />
              </motion.div>
            </motion.div>

            {/* Misi Section */}
            <motion.div 
              className="bg-[#154472] rounded-lg p-8 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 font-poppins">Misi</h2>
              <motion.div 
                className="text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div
                  className="text-sm leading-relaxed mb-16 font-inter"
                  dangerouslySetInnerHTML={{ __html: data.misi }}
                />
              </motion.div>
            </motion.div>
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
