"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/page";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
import News from "@/pages/News";
import API from "@/utils/api"; // Tambahkan ini
import lynan5 from "@/assets/lynan5.png"; // Pastikan path dan nama file sesuai dengan gambar Anda

function Layanan() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [layananData, setLayananData] = useState<any[]>([]);

  useEffect(() => {
    fetchLayananBK();
  }, []);

  const fetchLayananBK = async () => {
    try {
      const res = await API.get("/layananbk");
      setLayananData(res.data);
    } catch (err) {
      console.error("Error fetchLayananBK:", err); // Tambahkan log ini
      alert("Gagal memuat data layanan BK");
    }
  };

  const openModal = (image: string) => {
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
            <Link href="/" className=" hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/BK"
              className=" hover:text-gray-300"
            >
              BK
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/B-Layanan"
              className=" hover:text-gray-300"
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
              {item.judul}
            </div>
            <div className="cursor-pointer" onClick={() => openModal(item.foto)}>
              <img
                src={`http://localhost:8000/storage/${item.foto}`}
                alt={item.judul}
                width={370}
                height={280}
                className="rounded-lg shadow-lg"
              />
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
            <img
              src={`http://localhost:8000/storage/${selectedImage}`}
              alt="Selected"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
      <News/>
    </>
  );
}

export default Layanan;
