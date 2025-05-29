"use client";

import { motion, AnimatePresence } from "framer-motion";
import "../style.css"
import React, { useState } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import News from "@/pages/News";
import lynan1 from "@/assets/lynan1.png";
import lynan2 from "@/assets/lynan2.png";
import lynan3 from "@/assets/lynan3.png";
import lynan4 from "@/assets/lynan4.png";
import lynan5 from "@/assets/lynan5.png";
import klasik1 from "@/assets/klasik1.png";
import klasik2 from "@/assets/klasik2.png";
import klasik3 from "@/assets/klasik3.png";
import konseling from "@/assets/konseling.png";
import videdu from "@/assets/videdu.png";

const prestasiData = [
  { 
    id: 1, 
    image: lynan1,
    title: "Lomba Cerdas Cermat",
    level: "Tingkat Kabupaten",
    students: ["Andi Muh. Rizky", "Nurul Hidayah", "Ahmad Fauzan"],
    date: "15 Agustus 2023",
    year: "2023",
    description: "Detail prestasi 1 akan ditampilkan di sini. Tambahkan deskripsi lengkap tentang prestasi yang diraih."
  },
  { 
    id: 2, 
    image: lynan2, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi2" 
  },
  { 
    id: 3, 
    image: lynan3, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi3" 
  },
  { 
    id: 4, 
    image: lynan4, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi4" 
  },
  { 
    id: 5, 
    image: lynan5, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi5" 
  },
  { 
    id: 6, 
    image: klasik1, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi6" 
  },
  { 
    id: 7, 
    image: klasik2, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi7" 
  },
  { 
    id: 8, 
    image: klasik3, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi8" 
  },
  { 
    id: 9, 
    image: konseling, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi9" 
  },
  { 
    id: 10, 
    image: videdu, 
    title: "Judul", 
    level: "Default Level", 
    students: [], 
    date: "Default Date", 
    year: "Default Year", 
    description: "Default Description", 
    link: "/Prestasi10" 
  },
];

function Prestasi() {
  type Prestasi = {
    id: number;
    image: StaticImageData;
    title: string;
    level: string;
    students: string[];
    date: string;
    year: string;
    description?: string;
    link?: string;
  };
  
  const [selectedPrestasi, setSelectedPrestasi] = useState<Prestasi | null>(null);

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
            Prestasi
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
            <Link href="/prestasi" className="hover:text-gray-300 transition-colors duration-300">
              Prestasi
            </Link>
          </p>
        </motion.section>
      </motion.div>

      <div className="relative bg-gradient-to-b from-gray-50 via-blue-50 to-gray-100 min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <motion.div 
          className="px-6 py-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#154472] font-poppins tracking-wider mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Prestasi UPT SMPN 9 Binamu
            </motion.h1>
            <motion.div
              className="w-32 h-1 bg-yellow-400 mx-auto mb-8"
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
              Halaman Prestasi ini adalah cerminan kualitas pendidikan dan dedikasi tinggi dari seluruh warga sekolah. Setiap prestasi adalah bukti komitmen kami untuk memberikan yang terbaik bagi perkembangan dan kemajuan siswa.
            </motion.p>
          </div>

          <div className="relative px-4 md:px-12">
            {/* Previous Button */}
            <div className="absolute inset-y-0 -left-12 flex items-center z-20">
              <button className="swiper-button-prev !static !mt-0 !w-12 !h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                <svg 
                  className="w-6 h-6 text-[#154472] transform group-hover:scale-110 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="sr-only">Previous</span>
              </button>
            </div>

            {/* Next Button */}
            <div className="absolute inset-y-0 -right-12 flex items-center z-20">
              <button className="swiper-button-next !static !mt-0 !w-12 !h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                <svg 
                  className="w-6 h-6 text-[#154472] transform group-hover:scale-110 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="sr-only">Next</span>
              </button>
            </div>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ 
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active bg-[#154472]'
              }}
              className="pb-12"
            >
              {prestasiData.map((prestasi) => (
                <SwiperSlide key={prestasi.id}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-2"
                  >
                    <button 
                      onClick={() => setSelectedPrestasi(prestasi)}
                      className="block w-full overflow-hidden rounded-xl"
                    >
                      <div className="relative group">
                        <Image
                          src={prestasi.image}
                          alt={`Prestasi ${prestasi.id}`}
                          width={400}
                          height={400}
                          className="w-full h-[350px] object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                          <span className="text-white text-lg font-semibold">Lihat Detail</span>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedPrestasi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 overflow-y-auto"
            onClick={() => setSelectedPrestasi(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="min-h-screen py-8 px-4 flex items-center justify-center"
            >
              <div
                className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl mx-auto overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button - Floating Style */}
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setSelectedPrestasi(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Full Image Section */}
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={selectedPrestasi.image}
                    alt={selectedPrestasi.title || "Prestasi Image"}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-6 left-6 right-6 text-white text-3xl font-bold"
                  >
                    {selectedPrestasi.title}
                  </motion.h2>
                </div>

                {/* Content Section with Better Spacing */}
                <div className="p-8 space-y-8">
                  {/* Level Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-sm"
                  >
                    {selectedPrestasi.level}
                  </motion.div>

                  {/* Students Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-blue-50/50 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <h4 className="text-xl font-semibold text-[#154472] mb-4 flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Siswa Berprestasi
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPrestasi.students?.map((student, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span className="font-medium">{student}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Date and Time Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{selectedPrestasi.date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 font-medium">Tahun {selectedPrestasi.year}</span>
                    </div>
                  </motion.div>

                  {/* Description */}
                  {selectedPrestasi.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-gray-50 rounded-2xl p-6"
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {selectedPrestasi.description}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <News/>
    </>
  );
}

export default Prestasi;
