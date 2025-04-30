"use client";

import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
import News from "@/pages/News";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "@/utils/api";

function Akreditasi() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await API.get("/akreditasi");
      setData(res.data);
    } catch (error) {
      let errorMessage = "Gagal memuat data";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || "Gagal memuat data";
      }
      console.error("Error fetching data:", error);
      setData([]); // Reset data on error
    }
  };

  useEffect(() => {
    fetchData();
    const handleStorageChange = () => {
      const lastUpdate = localStorage.getItem("akreditasi_updated");
      if (lastUpdate) {
        fetchData();
        localStorage.removeItem("akreditasi_updated");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("akreditasi_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("akreditasi_updated", handleStorageChange);
    };
  }, []);

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
          <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins tracking-wide">
           Akreditasi
          </h1>
          <p className="text-white mt-2 py-3 font-normal font-inter">
            <Link
              href="/"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/TentangKami"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/akreditasi"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Akreditasi
            </Link>
          </p>
        </motion.section>
      </motion.div>

      {/* Top Wave with Animation */}
      <div className="relative w-full overflow-hidden -mt-1">
        <motion.svg
          viewBox="0 80 1410 100"
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

      <div className="container mx-auto px-4 md:px-8 py-12">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-[#154472] font-poppins tracking-wider mb-4 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Akreditasi UPT SMPN 9 Binamu
          </motion.h1>
          <motion.div
            className="w-32 h-1 bg-yellow-400 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p
            className="text-gray-700 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed bg-gray-100 rounded-full py-4 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Berikut adalah dokumen akreditasi sekolah kami yang menunjukkan
            komitmen kami terhadap standar pendidikan yang berkualitas.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {data.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full overflow-hidden rounded-lg shadow-lg"
                >
                  <Image
                    src={`${
                      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
                    }/storage/${item.file}`}
                    alt="Dokumen Akreditasi"
                    width={800}
                    height={600}
                    className="w-full h-auto transition-transform duration-300 hover:scale-105"
                  />
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/akreditasi/download/${item.file.split('/').pop()}`}
                    className="mt-4 inline-flex items-center gap-3 text-white bg-[#154472] hover:bg-[#1a5a99] transition-all font-medium py-3 px-6 rounded-lg cursor-pointer shadow-md w-full justify-center"
                    download
                  >
                    <FaDownload className="text-xl" />
                    Download Dokumen
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Bottom Wave with Animation */}
      <div className="relative w-full overflow-hidden">
        <motion.svg
          viewBox="0 0 1440 310"
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

export default Akreditasi;
