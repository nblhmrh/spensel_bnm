"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import { FaClipboardList, FaUsers, FaCertificate, FaNewspaper, FaBuilding, FaTrophy } from "react-icons/fa";
import News from "@/pages/News";
import { motion } from "framer-motion";

function Index() {
  const sections = [
    { title: "Visi & Misi", link: "/visi-misi", icon: <FaClipboardList size={50} className="text-blue-900" /> },
    { title: "Struktur Organisasi", link: "/struktur", icon: <FaUsers size={50} className="text-blue-900" /> },
    { title: "Akreditasi", link: "/akreditasi", icon: <FaCertificate size={50} className="text-blue-900" /> },
    { title: "Berita", link: "/Berita", icon: <FaNewspaper size={50} className="text-blue-900" /> },
    { title: "Fasilitas", link: "/fasilitas", icon: <FaBuilding size={50} className="text-blue-900" /> },
    { title: "Prestasi", link: "/prestasi", icon: <FaTrophy size={50} className="text-blue-900" /> },
  ];
  
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <>
      <motion.div 
        className="bg-[#154472] w-[1382px] h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />

        <motion.section 
          className="flex flex-col py-8 px-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff] font-poppins tracking-wide">
            Tentang Kami
          </h1>
          <p className="text-white mt-2 py-3 font-normal font-inter">
            <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/TentangKami"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Tentang Kami
            </Link>{" "}
          </p>
        </motion.section>
      </motion.div>

      <div className="max-w-5xl mx-auto py-10 px-5">
        <motion.div 
          className="text-center border-2 border-gray-500 p-4 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-blue-900 font-poppins leading-relaxed">
            Mengenal UPT SMPN 9 Binamu Lebih dari Sekedar Sekolah
          </h1>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {sections.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.link}>
                <div className="bg-gray-100 p-6 rounded-lg flex flex-row items-center cursor-pointer hover:bg-gray-200 transition-all duration-300 shadow-lg pl-20 hover:shadow-xl transform">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <p className="text-lg font-semibold mt-2 text-blue-900 px-4 font-poppins">{item.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <News/>
    </>
  );
}

export default Index;
