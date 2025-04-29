"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
<<<<<<< HEAD
import { motion } from "framer-motion";
import Card from "@/pages/Card";
import Image from "next/image";

import lynan1 from "@/assets/lynan1.png";
import lynan2 from "@/assets/lynan2.png";
import lynan3 from "@/assets/lynan3.png";
import lynan4 from "@/assets/lynan4.png";
import lynan5 from "@/assets/lynan5.png";
import klasik1 from "@/assets/klasik1.png";

// Update the newsData array to use imported images
const newsData = [
  { 
    id: 1, 
    image: lynan1, 
    link: "/Berita1",
    title: "Pertemuan Orang Tua Siswa Kelas IX",
    date: "15 Agustus 2023"
  },
  { 
    id: 2, 
    image: lynan2, 
    link: "/Berita2",
    title: "Kegiatan Literasi Digital",
    date: "20 Agustus 2023"
  },
  { 
    id: 3, 
    image: lynan3, 
    link: "/Berita3",
    title: "Pelatihan Guru dan Staff",
    date: "25 Agustus 2023"
  },
  { 
    id: 4, 
    image: lynan4, 
    link: "/Berita4",
    title: "Program Pengembangan Karakter",
    date: "30 Agustus 2023"
  },
  { 
    id: 5, 
    image: lynan5, 
    link: "/Berita5",
    title: "Prestasi Siswa dalam Olimpiade",
    date: "5 September 2023"
  },
  { 
    id: 6, 
    image: klasik1, 
    link: "/Berita6",
    title: "Kegiatan Ekstrakurikuler",
    date: "10 September 2023"
  }
];
=======
import Card from '@/pages/Card';
import API from '@/utils/api';
>>>>>>> ed4309a19efd90b9e4e1c03648c3a492a1eadde5

function Berita() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await API.get('/berita');
        setBerita(response.data);
      } catch (error) {
        console.error('Gagal memuat berita:', error);
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

<<<<<<< HEAD
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
=======
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
        {berita.map((item) => (
          <div key={item.id} className="relative group">
            <Link href={`/Berita1?id=${item.id}`}>
              <img
                src={`http://localhost:8000/storage/${item.thumbnail}`}
                alt={item.judul}
                className="w-full h-[250px] object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/default-image.png"; // Gambar default jika gagal load
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-white text-xl font-bold">
                {item.judul}
              </div>
            </Link>
            <Link
              href={`/Berita1?id=${item.id}`}
              className="absolute top-2 right-2 bg-gray-800 rounded-full p-2 shadow-md hover:bg-[#154472]"
>>>>>>> ed4309a19efd90b9e4e1c03648c3a492a1eadde5
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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {newsData.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <Link href={news.link}>
                  <div className="relative group">
                    <Image
                      src={news.image}
                      alt={news.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#154472] mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {news.date}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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

      <div className="relative bg-[#154472]">
        <Card />
      </div>
    </>
  );
}

export default Berita;
