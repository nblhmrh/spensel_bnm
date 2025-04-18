"use client";

import React from "react";
import "../app/globals.css";
import Navbar from "@/app/Navbar/page";
import Image from "next/image";
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
        
        if (response.data && response.data.status && response.data.data && response.data.data.length > 0) {
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

        <section className="flex flex-col items-center text-center py-16 px-6 ">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            UPT SMP NEGERI 9 BINAMU <br /> JENEPONTO
          </h1>
          <div className="mt-8 w-full md:w-2/3 lg:w-1/2 pt-14">
            <Image
              src={smbt}
              alt="Gedung Sekolah"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
      </div>
      <div>
        {/* Section: Kenapa Harus SMP Negeri 9 Binamu */}
        <section className="text-center pt-52 px-6">
          <h1 className="text-3xl font-bold text-blue-900">
            Kenapa Harus SMP Negeri 9 Binamu?
          </h1>
          <p className="text-gray-600 mt-3">
            Alasan kenapa kalian harus memilih untuk bergabung dengan SMPN 9
            Binamu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-blue-900 text-5xl mb-4">
                    <Icon />
                  </div>
                  <h3 className="font-semibold text-lg text-blue-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      {/* Section: Sambutan Kepala Sekolah */}
      <section className="relative py-12 px-6 top-14 flex flex-col md:flex-row items-center">
        {/* Background Gambar */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={smbt}
            alt="Sekolah"
            layout="fill"
            objectFit="cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gray-100/60 backdrop-blur-md"></div>
        </div>
        {/* Konten */}
        <div className="relative top-12 z-10 w-full h-[500px] md:w-1/3 flex justify-center">
          {loading ? (
            <p>Memuat foto...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : sambutanData ? (
            // Using regular img tag instead of Next.js Image
            <img
              src={`http://localhost:8000/storage/sambutan/${sambutanData.foto}`}
              alt={sambutanData.nama}
              className="rounded-lg object-cover h-full"
            />
          ) : (
            <Image
              src={ayah}
              alt="Kepala Sekolah"
              width={600}
              height={800}
              className="rounded-lg"
            />
          )}
        </div>
        <div className="relative pt-10 z-10 w-full md:w-2/3 mt-6 md:mt-0 md:ml-8 text-white">
          <h2 className="text-xl font-bold text-blue-900">
            SAMBUTAN KEPALA SEKOLAH
          </h2>
          <div className="text-gray-800 py-3">
            {loading ? (
              <p>Sedang memuat sambutan...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : sambutanData ? (
              <div>
                <p>Assalamualaikum warahmatullahi wabarakatuh.</p>
                <p className="py-1">{sambutanData.isi}</p>
              </div>
            ) : (
              <p>Tidak ada data sambutan yang tersedia</p>
            )}
          </div>
          <div className="bg-[#154472] px-6 py-3 w-[200px] h-[50px] rounded-full font-bold text-yellow-600">
            {sambutanData ? sambutanData.nama : "Amirullah, M.Pd"}
          </div>
        </div>
      </section>

      <div className="pt-6">
        <News />
      </div>
    </>
  );
}
