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
        className="bg-[#154472] relative overflow-hidden"
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

      <div className="relative bg-gradient-to-b from-gray-50 via-blue-50 to-gray-100 min-h-screen">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-5xl font-bold text-[#154472] font-poppins tracking-wider mb-2">
                VISI & MISI
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
            </div>
            <motion.div
              className="mt-8 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl text-[#154472] font-poppins font-semibold">
                UPT SMPN 9 BINAMU
              </h2>
            </motion.div>
          </motion.div>

          <div className="flex flex-col space-y-8 mt-12">
            {/* Visi Card */}
            <motion.div 
              className="group relative h-auto w-full"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#154472] to-[#1a5a99] rounded-2xl p-8 transform rotate-1 group-hover:rotate-0 transition-transform duration-300 hover:shadow-xl border border-blue-400/20">
                <div className="bg-yellow-400 text-[#154472] px-6 py-2 rounded-full font-bold font-poppins text-xl inline-block mb-6 shadow-lg">
                  Visi
                </div>
                <motion.div 
                  className="text-white prose prose-lg prose-invert"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div
                    className="text-lg leading-relaxed font-inter"
                    dangerouslySetInnerHTML={{ __html: data.visi }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Misi Card */}
            <motion.div 
              className="group relative h-auto w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1a5a99] to-[#154472] rounded-2xl p-8 transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 hover:shadow-xl border border-blue-400/20">
                <div className="bg-yellow-400 text-[#154472] px-6 py-2 rounded-full font-bold font-poppins text-xl inline-block mb-6 shadow-lg">
                  Misi
                </div>
                <motion.div 
                  className="text-white prose prose-lg prose-invert"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div
                    className="text-lg leading-relaxed font-inter"
                    dangerouslySetInnerHTML={{ __html: data.misi }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave with gradient */}
        <div className="relative w-full mt-26">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#154472] opacity-30"></div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1434 320" 
            className="w-full h-auto relative z-10"
          >
            <path 
              fill="#154472" 
              fillOpacity="1"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values="
                  M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                  M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,240C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                  M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </path>
          </svg>
        </div>
      </div>
      <News />
    </>
  );
}
