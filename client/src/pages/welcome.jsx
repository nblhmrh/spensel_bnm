"use client";

import React from "react";
import "../app/globals.css";
import Navbar from "@/app/Navbar/page";
import Image from "next/image";
import smp9 from "../assets/smp9.png";
import laskar from "../assets/laskar.jpg";
import smbt from "../assets/smbt.png";
import News from "@/pages/News";
import ayah from "../assets/ayah.png";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  FaBuilding,
  FaChalkboardTeacher,
  FaLeaf,
  FaHandshake,
} from "react-icons/fa";

export default function Home() {
  // Tambahkan state untuk menyimpan data sambutan
  const [sambutanData, setSambutanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from the API
  const fetchSambutan = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/sambutan");
      console.log("Response data:", response.data);

      if (
        response.data &&
        response.data.status &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setSambutanData(response.data.data[0]); // Ambil data pertama dari array
      } else {
        setError("Format data tidak sesuai");
        console.error("Format data tidak sesuai:", response.data);
      }
    } catch (err) {
      console.error("Error fetching sambutan:", err);
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSambutan();
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
      <div className="bg-[#154472] w-full h-[500px]">
        <Navbar />

        <section className="flex flex-col items-center text-center py-6 px-6 ">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            UPT SMP NEGERI 9 BINAMU <br /> JENEPONTO
          </h1>
          <div className="mt-4 w-full max-w-4xl mx-auto pt-6">
            <Image
              src={smp9}
              alt="Gedung Sekolah"
              className="rounded-lg shadow-lg w-full h-auto"
              width={1200}
              height={750}
            />
          </div>
        </section>
      </div>
      <div>
        {/* Section: Kenapa Harus SMP Negeri 9 Binamu */}
        <section className="text-center pt-52 mb-8 px-8 bg-white">
          <h1 className="text-3xl md:text-3xl font-bold text-[#154472] mb-4 mt-20">
            Temukan Keunggulan UPT SMPN 9 Binamu
          </h1>
          <p className="text-gray-700 text-2xl ">
            Ini dia beberapa alasan kuat untuk bergabung dengan{" "}
            <br className="hidden md:block " />
            UPT SMPN 9 Binamu
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-[#012c5e] text-white p-6 rounded-xl shadow-md"
                >
                  <div className="text-white text-4xl mb-8">
                    <Icon />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm mt-4">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <div className="relative ">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#F9F9FA"
            d="M0,160L80,170.7C160,181,320,203,480,213.3C640,224,800,224,960,213.3C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
      {/* Section: Sambutan Kepala Sekolah */}
      <section className="relative py-16 px-2 flex flex-col md:flex-row items-center overflow-hidden">
        {/* Background Gambar + Overlay Blur */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={smbt}
            alt="Sekolah"
            layout="fill"
            objectFit="cover"
            quality={90}
            className="mt-36 mb-9 w-full block"
          />
          <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-md"></div>
        </div>

        {/* Foto Kepala Sekolah */}
        <div className="relative z-10 w-full md:w-1/3 flex justify-center h-[500px]">
          {loading ? (
            <p>Memuat foto...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : sambutanData ? (
            <img
              src={`http://localhost:8000/storage/sambutan/${sambutanData.foto}`}
              alt={sambutanData.nama}
              className="object-cover h-full"
            />
          ) : (
            <Image
              src={ayah}
              alt="Kepala Sekolah"
              width={600}
              height={800}
              className="object-cover h-full"
            />
          )}
        </div>

        {/* Teks Sambutan */}
        <div className="relative z-10 w-full md:w-2/3 mt-8 md:mt-0 md:ml-10 text-blue-900">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            SAMBUTAN KEPALA SEKOLAH
          </h2>
          <div className="text-gray-800 mb-6">
            {loading ? (
              <p>Sedang memuat sambutan...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : sambutanData ? (
              <div>
                <p>Assalamualaikum warahmatullahi wabarakatuh.</p>
                <p className="py-2">{sambutanData.isi}</p>
              </div>
            ) : (
              <p>Tidak ada data sambutan yang tersedia</p>
            )}
          </div>
          <div className="inline-block bg-[#154472] px-6 py-3 rounded-full font-bold text-yellow-400">
            {sambutanData ? sambutanData.nama : "Amirullah, S.Pd., M.Pd."}
          </div>
        </div>
      </section>
      {/* Gelombang Bawah */}
      <div className="relative -mb-16">
        <svg
          className="w-full h-auto "
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#154472"
            d="M0,160L80,149.3C160,139,320,117,480,117.3C640,117,800,139,960,144C1120,149,1280,139,1360,133.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      <div className="pt-6">
        <News />
      </div>
    </>
  );
}
