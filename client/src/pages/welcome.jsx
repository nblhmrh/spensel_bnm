"use client";

import React, { useState, useEffect } from "react";
import "../app/globals.css";
import Navbar from "@/app/Navbar/page";
import Image from "next/image";
import smp9 from "../assets/smp9.png";
import laskar from "../assets/laskar.jpg";
import smbt from "../assets/smbt.png";
import News from "@/pages/News";
import ayah from "../assets/ayah.png";
import axios from "axios";
import {
  FaBuilding,
  FaChalkboardTeacher,
  FaLeaf,
  FaHandshake,
} from "react-icons/fa";

// Constants
const FEATURES = [
  {
    icon: FaBuilding,
    title: "Fasilitas Lengkap",
    desc: "Dukungan belajar terbaik dengan kualitas premium.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Pengajar Kompeten",
    desc: "Guru yang relevan dengan kebutuhan zaman.",
  },
  {
    icon: FaLeaf,
    title: "Lingkungan Nyaman",
    desc: "Menempati lingkungan yang ramah, tenang, dan ideal.",
  },
  {
    icon: FaHandshake,
    title: "Kerjasama Luas",
    desc: "Mengembangkan peluang profesional selama masa studi.",
  },
];

// Components
const FeatureCard = ({ icon: Icon, title, desc, index }) => (
  <div
    key={index}
    className="group flex flex-col items-center text-center bg-gradient-to-br from-[#154472] to-[#012c5e] text-white p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-4 relative before:absolute before:inset-0 before:bg-black/5 before:rounded-2xl before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 after:absolute after:inset-x-0 after:-bottom-2 after:h-1 after:bg-yellow-400 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-center"
    style={{
      animation: `fadeIn 0.5s ease-out ${index * 0.2}s forwards`,
      opacity: 0,
      transform: 'translateY(20px)',
      perspective: '1000px'
    }}
  >
    <div className="text-white text-5xl mb-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:transform-gpu group-hover:translate-z-10">
      <Icon />
    </div>
    <h3 className="font-bold text-xl mb-3 transition-all duration-300 group-hover:text-yellow-400 group-hover:translate-y-[-2px]">
      {title}
    </h3>
    <p className="text-sm mt-4 text-gray-200 transition-all duration-300 group-hover:text-white">
      {desc}
    </p>
  </div>
);

// Main component
export default function Home() {
  // State management
  const [sambutanData, setSambutanData] = useState(null);
  const [fotoSekolah, setFotoSekolah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Data fetching functions
  const fetchSambutan = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/sambutan", {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
      if (response.data.status && response.data.data.length > 0) {
        const data = response.data.data[0];
        setSambutanData({
          ...data,
          foto: `${data.foto}?v=${new Date().getTime()}`
        });
      }
    } catch (err) {
      console.error("Error fetching sambutan:", err);
      setError("Gagal mengambil data sambutan");
    } finally {
      setLoading(false);
    }
  };

  const fetchFotoSekolah = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/foto-sekolah");
      if (response.data && response.data.length > 0) {
        setFotoSekolah(response.data[0]);
      }
    } catch (err) {
      console.error("Error fetching foto sekolah:", err);
    }
  };

  // Effects
  useEffect(() => {
    fetchSambutan();
    fetchFotoSekolah();

    const handleStorageChange = () => {
      const lastUpdate = localStorage.getItem('sambutan_updated');
      if (lastUpdate) {
        fetchSambutan();
        localStorage.removeItem('sambutan_updated');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sambutan_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sambutan_updated', handleStorageChange);
    };
  }, []);

  const features = [
    {
      icon: FaBuilding,
      title: "Fasilitas Lengkap",
      desc: "Dukungan belajar terbaik dengan kualitas premium.",
    },
    {
      icon: FaChalkboardTeacher,
      title: "Pengajar Kompeten",
      desc: "Guru yang relevan dengan kebutuhan zaman.",
    },
    {
      icon: FaLeaf,
      title: "Lingkungan Nyaman",
      desc: "Menempati lingkungan yang ramah, tenang, dan ideal.",
    },
    {
      icon: FaHandshake,
      title: "Kerjasama Luas",
      desc: "Mengembangkan peluang profesional selama masa studi.",
    },
  ];
  return (
    <>
      <div className="bg-[#154472] w-full min-h-[300px] sm:h-[400px] md:h-[500px] transition-all duration-500">
        <Navbar />

        <section className="flex flex-col items-center text-center py-6 px-6 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff] transform transition-all duration-500 hover:scale-105">
            UPT SMP NEGERI 9 BINAMU <br /> JENEPONTO
          </h1>
          <div className="mt-6 w-full max-w-4xl mx-auto pt-6 transform transition-all duration-500 hover:shadow-2xl">
            {fotoSekolah ? (
              <img
                src={`http://localhost:8000/storage/${fotoSekolah.file}`}
                alt="Gedung Sekolah"
                className="rounded-lg shadow-lg w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = smp9.src; // fallback
                  console.error("Error loading school image, fallback to default image");
                }}
              />
            ) : (
              <Image
                src={smp9}
                alt="Gedung Sekolah"
                className="rounded-lg shadow-lg w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
                width={1200}
                height={750}
              />
            )}
          </div>
        </section>
      </div>
      <div>
        <section className="text-center pt-48 mb-8 px-6 bg-white ">
          <h1 className="text-3xl md:text-4xl font-bold text-[#154472] mb-4 transform transition-all duration-500 hover:scale-105">
            Temukan Keunggulan!
          </h1>
          <p className="text-gray-700 text-2xl font-inter leading-relaxed animate-slideUp relative group">
            <span className="inline-block transition-all duration-300 group-hover:translate-y-[-8px] group-hover:text-[#154472]">Ini dia beberapa alasan kuat untuk bergabung dengan</span>{" "}
            <br className="hidden md:block" />
            <span className="text-[#154472] font-semibold inline-block transition-all duration-300 group-hover:translate-y-[-8px] group-hover:text-yellow-400 hover:scale-105">
              UPT SMPN 9 Binamu
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 animate-fadeInUp ">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center bg-gradient-to-br from-[#154472] to-[#012c5e] text-white p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-4 relative before:absolute before:inset-0 before:bg-black/5 before:rounded-2xl before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 after:absolute after:inset-x-0 after:-bottom-2 after:h-1 after:bg-yellow-400 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-center"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.2}s forwards`,
                    opacity: 0,
                    transform: 'translateY(20px)',
                    perspective: '1000px'
                  }}
                >
                  <div className="text-white text-5xl mb-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:transform-gpu group-hover:translate-z-10">
                    <Icon />
                  </div>
                  <h3 className="font-bold text-xl mb-3 transition-all duration-300 group-hover:text-yellow-400 group-hover:translate-y-[-2px]">
                    {feature.title}
                  </h3>
                  <p className="text-sm mt-4 text-gray-200 transition-all duration-300 group-hover:text-white">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <div className="relative">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#F1F5F9"
            d="M0,160L80,170.7C160,181,320,203,480,213.3C640,224,800,224,960,213.3C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
      {/* Section: Sambutan Kepala Sekolah */}
      <section className="relative py-16 px-2 flex flex-col md:flex-row items-center overflow-hidden bg-[#F1F5F9]">
        {/* Background Gambar + Overlay Blur */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={smbt}
            alt="Sekolah"
            layout="fill"
            objectFit="cover"
            quality={90}
            className="w-full block transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#F1F5F9]/80 backdrop-blur-sm transition-all duration-500"></div>
        </div>

        {/* Foto Kepala Sekolah */}
        <div className="relative w-full md:w-1/3 flex justify-center md:justify-start h-[400px] sm:h-[500px] md:h-[600px] transform transition-all duration-500 px-4 md:pl-8">
          {loading ? (
            <p className="z-20">Memuat foto...</p>
          ) : error ? (
            <p className="text-red-500 z-20">{error}</p>
          ) : sambutanData ? (
            <div className="w-full h-full relative">
              <img 
                src={`http://localhost:8000/storage/${sambutanData.foto}`}
                alt="Foto Kepala Sekolah"
                className="object-contain md:object-cover h-full w-full"
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null; // Hindari infinite loop
                  target.src = ayah.src; // Fallback ke gambar default jika error tampilkan ayah.png
                  console.error("Error loading image from:", `http://localhost:8000/storage/${sambutanData.foto}`);
                }}
                key={`sambutan-${sambutanData.foto}`}
              />
            </div>
          ) : (
            <div className="w-full h-full relative">
              <Image
                src={ayah}
                alt="Kepala Sekolah"
                width={600}
                height={800}
                className="object-contain md:object-cover h-full w-full"
              />
            </div>
          )}
        </div>

        {/* Teks Sambutan */}
        <div className="relative z-20 w-full md:w-2/3 mt-8 md:mt-0 md:ml-10 text-blue-900 transform transition-all duration-500 hover:translate-x-2">
          <h2 className="text-xl md:text-2xl font-bold mb-4 transition-all duration-300 hover:text-[#154472]">
            SAMBUTAN KEPALA SEKOLAH
          </h2>
          <div className="text-gray-800 mb-6">
            {loading ? (
              <p>Sedang memuat sambutan...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : sambutanData ? (
              <div>
                <p className="py-2">{sambutanData.isi}</p>
              </div>
            ) : (
              <p>Tidak ada data sambutan yang tersedia</p>
            )}
          </div>
          <div className="inline-block bg-[#154472] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-yellow-400">
            {sambutanData ? sambutanData.nama : "Amirullah, S.Pd., M.Pd."}
          </div>
        </div>
      </section>

      {/* Double Wave Effect */}
      <div className="relative -mt-16 sm:-mt-24 md:-mt-32">
        {/* Top wave - Solid color matching background */}
        <div className="absolute w-full -top-10 sm:-top-20 md:-top-36">
          <svg
            className="w-full h-auto min-h-[140px]"
            viewBox="0 0 1300 180"
            preserveAspectRatio="none"
          >
            <path
              fill="#154472"
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
        
        {/* Bottom wave - Main blue color */}
        <svg
          className="w-full h-auto relative z-10 min-h-[120px]"
          viewBox="0 30 1410 90"
          preserveAspectRatio="none"
        >
          <path
            fill="#154472"
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <div className="-mt-1 sm:mt-0">
          <News />
        </div>
      </div>
     
    </>
  );
}
