"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import API from "@/utils/api";
import { motion } from "framer-motion";
// Tetap import gambar default sebagai fallback
import klasik1 from "@/assets/klasik1.png";

// Tipe data untuk fasilitas dari API
interface Fasilitas {
  id: number;
  judul: string;
  deskripsi: string;
  foto: string;
}

function Fasilitas() {
  const [fasilitasData, setFasilitasData] = useState<Fasilitas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<{ 
    title: string; 
    description: string; 
    image: string;
    isFromApi: boolean;
  } | null>(null);

  const fetchData = async () => {
    try {
      const res = await API.get("/fasilitas");
      setFasilitasData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fasilitas:", error);
      setError("Gagal memuat data fasilitas");
      setLoading(false);
    }
  };

  // Menambahkan useEffect untuk memantau perubahan di localStorage
  useEffect(() => {
    fetchData();

    // Fungsi untuk menangani event storage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fasilitas_updated') {
        fetchData();
      }
    };

    // Menambahkan event listener
    window.addEventListener('storage', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px] transform transition-all duration-500 ease-in-out">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-[#ffff] transform"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            Fasilitas
          </motion.h1>
          <motion.p 
            className="text-white mt-2 py-3 font-normal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className="hover:text-gray-300 transition-colors duration-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link href="/fasilitas" className="hover:text-gray-300 transition-colors duration-300">
              Fasilitas
            </Link>
          </motion.p>
        </section>
      </div>

      <div className="px-6 py-8">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#154472] font-poppins tracking-wider mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            Fasilitas UPT SMPN 9 Binamu
          </motion.h1>
          <motion.div
            className="w-32 h-1 bg-yellow-400 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p
            className="text-gray-700 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.6,
              ease: "easeOut"
            }}
          >
            Berikut merupakan Fasilitas dari UPT SMPN 9 Binamu yang tersedia untuk mendukung kegiatan belajar mengajar dan pengembangan siswa. Setiap fasilitas dirancang untuk memastikan kenyamanan dan efektivitas proses pembelajaran.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#154472]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8 animate-fadeIn">
            {error}
          </div>
        ) : fasilitasData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {fasilitasData.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage({
                  title: item.judul,
                  description: item.deskripsi,
                  image: `http://localhost:8000/storage/${item.foto}`,
                  isFromApi: true
                })}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <div className="w-full h-[225px] relative group">
                    <img
                      src={`http://localhost:8000/storage/${item.foto}`}
                      alt={item.judul}
                      className="rounded-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = klasik1.src;
                      }}
                    />
                  </div>
                  <button
                    className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-75 transition-all duration-300 transform hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage({
                        title: item.judul,
                        description: item.deskripsi,
                        image: `http://localhost:8000/storage/${item.foto}`,
                        isFromApi: true
                      });
                    }}
                  >
                    +
                  </button>
                </div>
                <h2 className="mt-2 text-gray-700 font-semibold text-lg transition-colors duration-300 hover:text-[#154472]">
                  {item.judul}
                </h2>
                <p className="text-gray-600 transition-colors duration-300 hover:text-gray-800">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 animate-fadeIn">
            Belum ada data fasilitas. Silakan tambahkan melalui halaman admin.
          </div>
        )}
      </div>
      <News />

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl transform transition-all duration-300 scale-95 hover:scale-100">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="rounded-lg max-w-full max-h-[70vh] transition-all duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = klasik1.src;
              }}
            />
            <h2 className="mt-4 text-xl font-bold text-center transform transition-all duration-300 hover:scale-105">
              {selectedImage.title}
            </h2>
            <p className="text-gray-600 text-center">{selectedImage.description}</p>
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-800 transition-all duration-300 transform hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Fasilitas;
