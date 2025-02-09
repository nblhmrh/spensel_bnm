"use client";

import React, { useState } from "react";
import Navbar from "../Navbar/page";
import Image from "next/image";
import Link from "next/link";
import News from "@/pages/News";
// Import gambar dari folder assets
import lynan1 from "@/assets/lynan1.png";
import lynan2 from "@/assets/lynan2.png";
import lynan3 from "@/assets/lynan3.png";
import lynan4 from "@/assets/lynan4.png";
import lynan5 from "@/assets/lynan5.png";

const layananData = [
  { src: lynan1, label: "Jenis Layanan BK" },
  { src: lynan2, label: "Layanan langsung" },
  { src: lynan3, label: "Layanan melalui media" },
  { src: lynan4, label: "Penanganan siswa" },
];

function Layanan() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Layanan BK
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/BK"
              className="underline hover:text-gray-300"
            >
              BK
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/B-Layanan"
              className="underline hover:text-gray-300"
            >
              Layanan BK
            </Link>{" "}
          
          </p>
        </section>
      </div>

      <div className="px-6 py-8">
        
        <p className="text-gray-700 text-2xl font-medium py-1 text-center">
        Kami percaya bahwa setiap siswa memiliki potensi untuk sukses. Melalui layanan BK yang komprehensif, kami berupaya memfasilitasi pengembangan diri siswa secara optimal.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 p-6 place-items-center">
        {layananData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-gray-200 px-4 py-2 rounded-md mb-2 text-gray-700 font-semibold">
              {item.label}
            </div>
            <div className="cursor-pointer" onClick={() => openModal(item.src)}>
              <Image src={item.src} alt={item.label} width={370} height={280} className="rounded-lg shadow-lg" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 pb-14">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 px-4 py-2 rounded-md mb-2 text-gray-700 font-semibold">
            Kontak BK
          </div>
          <div className="cursor-pointer" onClick={() => openModal(lynan5)}>
            <Image src={lynan5} alt="Kontak BK" width={370} height={280} className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>

      {modalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="relative">
            <button className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full" onClick={closeModal}>
              X
            </button>
            <Image src={selectedImage} alt="Selected" width={600} height={400} className="rounded-lg" />
          </div>
        </div>
      )}
      <News/>
    </>
  );
}

export default Layanan;
