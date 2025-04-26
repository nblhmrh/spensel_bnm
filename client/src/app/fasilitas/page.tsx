"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import API from "@/utils/api";
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

  // Fetch data dari API
  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">Fasilitas</h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300"> Beranda </Link> &gt;
            <Link href="/TentangKami" className=" hover:text-gray-300"> Tentang Kami </Link> &gt;
            <Link href="/fasilitas" className=" hover:text-gray-300"> Fasilitas </Link>
          </p>
        </section>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-3xl text-[#154472] font-semibold">Fasilitas UPT SMPN 9 Binamu</h1>
        <p className="text-gray-800 text-lg font-medium py-1">
          Berikut merupakan Fasilitas dari UPT SMPN 9 Binamu.
        </p>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#154472]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        ) : fasilitasData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {fasilitasData.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer" 
                onClick={() => setSelectedImage({
                  title: item.judul,
                  description: item.deskripsi,
                  image: `http://localhost:8000/storage/${item.foto}`,
                  isFromApi: true
                })}
              >
                <div className="relative">
                  <div className="w-full h-[225px] relative">
                    <img
                      src={`http://localhost:8000/storage/${item.foto}`}
                      alt={item.judul}
                      className="rounded-lg w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = klasik1.src;
                      }}
                    />
                  </div>
                  <button
                    className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-75"
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
                <h2 className="mt-2 text-gray-700 font-semibold text-lg">{item.judul}</h2>
                <p className="text-gray-600">{item.deskripsi}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            Belum ada data fasilitas. Silakan tambahkan melalui halaman admin.
          </div>
        )}
      </div>
      <News />

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="rounded-lg max-w-full max-h-[70vh]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = klasik1.src;
              }}
            />
            <h2 className="mt-4 text-xl font-bold text-center">{selectedImage.title}</h2>
            <p className="text-gray-600 text-center">{selectedImage.description}</p>
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-800"
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
