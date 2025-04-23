"use client";
import React, { useState } from "react";
import Navbar from "../Navbar/page";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import News from "@/pages/News";
import ballart from "@/public/ballart.png";
import pramuka from "@/public/pramuka.png";
import pmr from "@/public/pmr.png";
import gps from "@/public/gps.png";
import ekskul from "@/public/ekskul.png";
import fallbackImage from "@/public/fallbackImage.jpg";

function Ekskul() {
  const ekstrakurikulerData = [
    {
      id: 1,
      name: "Balla Art",
      category: "Sanggar Seni",
      description:
        "Sanggar seni Balla' Art adalah organisasi yang bergerak dalam pengembangan minat bakat, pembinaan, dan pementasan seni, terutama seni tradisional dan budaya lokal.",
      image: ballart,
    },
    {
      id: 2,
      name: "Pramuka",
      category: "Kepanduan",
      description:
        "Pramuka adalah ekstrakurikuler yang membentuk karakter disiplin, kepemimpinan, dan keterampilan bertahan hidup di alam terbuka.",
      image: pramuka,
    },
    {
      id: 3,
      name: "PMR",
      category: "Palang Merah Remaja",
      description:
        "PMR bertujuan untuk melatih siswa dalam keterampilan pertolongan pertama, kepedulian sosial, dan kesiapsiagaan dalam situasi darurat.",
      image: pmr,
    },
    {
      id: 4,
      name: "GPS",
      category: "Gabungan Pecinta Sekolah",
      description:
        "GPS adalah komunitas yang berfokus pada kepedulian lingkungan sekolah, kebersihan, penghijauan, serta berbagai kegiatan sosial.",
      image: gps,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ekstrakurikulerData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === ekstrakurikulerData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Peraturan & Tata Tertib
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/Program" className="underline hover:text-gray-300">
              Program
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/P-peraturan-&-tata-tertib"
              className="underline hover:text-gray-300"
            >
              Peraturan & Tata Tertib
            </Link>{" "}
          </p>
        </section>
      </div>

      <div className="bg-white text-[#154472] font-bold py-10 px-6 md:px-16 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl md:text-3xl font-bold">
            Siap untuk menjelajahi berbagai kegiatan menarik?
          </h2>
          <p className="text-md md:text-lg mt-2">
            Mari kita intip keseruan ekstrakurikuler di SMPN 9 Binamu
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center px-14 justify-between w-full mt-6">
          <div className="flex items-center">
            <button
              onClick={prevSlide}
              className="p-3 bg-[#154472] text-white rounded-full shadow-md hover:bg-gray-400 transition"
            >
              <FaChevronLeft size={24} />
            </button>
            <div className="mx-6 text-center flex flex-col items-center">
              <div className="w-40 h-40 relative">
                <Image
                  src={
                    ekstrakurikulerData[currentIndex]?.image || fallbackImage
                  }
                  alt={
                    ekstrakurikulerData[currentIndex]?.name ||
                    "Gambar tidak ditemukan"
                  }
                  width={150}
                  height={150}
                  objectFit="contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold mt-4">
                {ekstrakurikulerData[currentIndex]?.name}
              </h3>
              <p className="text-sm text-gray-500">
                {ekstrakurikulerData[currentIndex]?.category}
              </p>
              <p className="bg-[#154472] text-white p-4 rounded-lg text-sm mt-4 max-w-md">
                {ekstrakurikulerData[currentIndex]?.description}
              </p>
            </div>
            <button
              onClick={nextSlide}
              className="p-3 bg-[#154472] text-white rounded-full shadow-md hover:bg-gray-400 transition"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
          <div className="flex justify-center mt-8 px-18 md:mt-0">
            <Image
              src={ekskul}
              alt="Ekstrakurikuler Icons"
              width={400}
              height={400}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <News />
    </>
  );
}

export default Ekskul;
