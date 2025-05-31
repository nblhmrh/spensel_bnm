"use client";

import { useState, useEffect } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import { motion } from "framer-motion";
import API from "@/utils/api"; // axios instance, baseURL pointing to backend
import Image from "next/image";

interface Berita {
  id: number;
  judul: string;
  foto: string;
  slug: string;
  tanggal: string;
}

function Berita() {
  const [newsData, setNewsData] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await API.get("/berita");
        setNewsData(response.data);
      } catch (err) {
        setNewsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBerita();
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
            Berita
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
            <Link href="/Berita" className="hover:text-gray-300 transition-colors duration-300">
              Berita Terkini
            </Link>
          </p>
        </motion.section>
      </motion.div>

      {/* Top Wave with Animation */}
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
                "M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,112C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>

      <div className="relative bg-white min-h-screen">
        <div className="container mx-auto px-4 md:px-8 py-2 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#154472] font-poppins tracking-wider mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Berita UPT SMPN 9 Binamu
            </motion.h1>
            <motion.div
              className="w-32 h-1 bg-yellow-400 mx-auto mb-4"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.p
              className="text-gray-700 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Selamat datang di halaman berita UPT SMPN 9 Binamu! Temukan informasi terkini seputar kegiatan, prestasi, dan perkembangan di sekolah kita.
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-10">Memuat berita...</div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {newsData.map((news) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
                >
                  {/* Perbaiki Link agar langsung ke halaman detail berita sesuai slug */}
                  <Link href={`/Berita/${news.slug}`}>
                    <div className="relative group">
                      <img
                        src={`http://localhost:8000/storage/${news.foto}`}
                        alt={news.judul}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#154472] mb-2 group-hover:text-blue-700 transition-colors duration-300">
                        {news.judul}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {news.tanggal}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      {/* Bottom Wave with Animation */}
      <div className="relative w-full overflow-hidden">
        <motion.svg 
          viewBox="0 0 1440 320" 
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
                "M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,112C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>
    </>
  );
}

export default Berita;
