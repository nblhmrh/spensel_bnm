"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import {
  FaUserCircle,
  FaClipboardList,
  FaCamera,
  FaHeadset,
  FaFolderOpen,
} from "react-icons/fa";
import News from "@/pages/News";
import { motion } from "framer-motion";

const layanan = [
  { title: "Profil BK", icon: <FaUserCircle />, link: "/B-Profil" },
  { title: "Asesmen BK", icon: <FaClipboardList />, link: "/B-Asesmen" },
  { title: "Dokumentasi BK", icon: <FaCamera />, link: "/B-Dokumentasi" },
  { title: "Layanan BK", icon: <FaFolderOpen />, link: "/B-Layanan" },
  { title: "Pengaduan", icon: <FaHeadset />, link: "/B-Pengaduan" },
];

export default function LayananBK() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <motion.div
        className="bg-[#154472] w-full h-[300px] relative overflow-hidden"
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
          <h1 className="text-3xl md:text-4xl font-bold text-white text-left">
            Bimbingan & Konseling
          </h1>
          <p className="text-white mt-2 py-3 font-normal text-left">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-gray-300"
            >
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/BK"
              className="transition-colors duration-300 hover:text-gray-300"
            >
              BK
            </Link>
          </p>
        </motion.section>
      </motion.div>

      <div className="relative w-full overflow-hidden -mt-1">
        <motion.svg
          viewBox="0 70 1440 120"
          className="w-full h-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.path
            fill="#154472"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            animate={{
              d: [
                "M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,112C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>

      {/* Header Layanan */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-[#154472] text-white py-3 px-6 text-2xl font-semibold rounded-full shadow-lg transform transition-all duration-500 hover:scale-105">
          Layanan BK Temanmu dalam Menjelajahi Diri
        </div>
      </motion.div>

      {/* Grid Layanan */}
      <motion.div
        className="flex justify-center flex-wrap gap-6 px-6 py-12"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {layanan.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={item.link}>
              <div className="bg-gray-100 rounded-lg p-6 shadow-md flex flex-col items-center w-[180px] transform transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
                <motion.div
                  className="bg-[#154472] text-white p-4 rounded-full text-3xl flex items-center justify-center w-[60px] h-[60px]"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <p className="mt-3 text-[#154472] font-semibold text-center transition-colors duration-300 group-hover:text-[#1a5a99]">
                  {item.title}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Wave */}
      <div className="relative w-full overflow-hidden">
        <motion.svg
          viewBox="0 0 1440 230"
          className="w-full h-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.path
            fill="#154472"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,112C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>

      <News />
    </>
  );
}
