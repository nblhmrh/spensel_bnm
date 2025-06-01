"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import API from "@/utils/api";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DokumentasiBK = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/dokumentasibk");
      setData(res.data);
    } catch (err) {
      alert("Gagal memuat data dokumentasi");
    }
  };

  const openModal = (index: number) => {
    setSelectedImage(data[index]);
    setCurrentIndex(index);
  };

  const closeModal = () => setSelectedImage(null);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % data.length;
    setSelectedImage(data[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + data.length) % data.length;
    setSelectedImage(data[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div>
        <div className="bg-[#154472] w-[1382px] h-[300px] transition-all duration-500">
          <Navbar />

          <section className="flex flex-col py-8 px-6 ">
            <h1 className="text-3xl md:text-4xl font-bold text-[#ffff] ">
              Dokumentasi BK
            </h1>
            <p className="text-white mt-2 py-3 font-normal ">
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-gray-300"
              >
                Beranda
              </Link>{" "}
              &gt;{" "}
              <Link
                href="/BK"
                className="transition-colors duration-300 hover:text-gray-300"
              >
                BK
              </Link>{" "}
              &gt;{" "}
              <Link
                href="/B-Dokumentasi"
                className="transition-colors duration-300 hover:text-gray-300"
              >
                Dokumentasi
              </Link>{" "}
            </p>
          </section>
        </div>

        <div
          className="px-6 py-8 animate-fadeIn"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-gray-700 text-2xl font-medium py-1 text-center transform transition-all duration-500 hover:scale-105">
            Kami percaya bahwa setiap siswa memiliki potensi untuk sukses.
            Melalui layanan BK yang komprehensif, kami berupaya memfasilitasi
            pengembangan diri siswa secara optimal.
          </p>
        </div>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="relative cursor-pointer group perspective-1000"
                onClick={() => openModal(index)}
                style={{
                  opacity: 0,
                  animation: `fadeSlideUp 0.6s ease-out ${
                    index * 0.2
                  }s forwards`,
                }}
              >
                <div className="transform transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={`http://localhost:8000/storage/${item.foto}`}
                    alt={item.judul}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg transition-all duration-500 group-hover:shadow-2xl object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-center py-4 rounded-b-lg opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="font-medium text-lg">{item.judul}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-modalFadeIn">
            {/* Close Button */}
            <button
              className="absolute top-6 right-8 text-white text-3xl p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
              onClick={closeModal}
              aria-label="Tutup"
            >
              <FaTimes />
            </button>
            {/* Previous Button */}
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
              onClick={prevImage}
              aria-label="Sebelumnya"
            >
              <FaChevronLeft />
            </button>
            {/* Image */}
            <img
              src={`http://localhost:8000/storage/${selectedImage.foto}`}
              alt={selectedImage.judul}
              width={600}
              height={450}
              className="rounded-lg transform transition-all duration-500 animate-scaleIn object-cover"
            />
            {/* Next Button */}
            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
              onClick={nextImage}
              aria-label="Selanjutnya"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
      <News />
    </>
  );
};

export default DokumentasiBK;
