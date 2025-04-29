"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Card from '@/pages/Card';
import API from '@/utils/api';

function Berita() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await API.get('/berita');
        setBerita(response.data);
      } catch (error) {
        console.error('Gagal memuat berita:', error);
      }
    };
    fetchBerita();
  }, []);

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            Berita Terkini
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className=" hover:text-gray-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/Berita"
              className=" hover:text-gray-300"
            >
              Berita 
            </Link>
          </p>
        </section>
      </div>

      <div className="px-8 pb-20 pt-10">
        <h1 className="text-white bg-[#154472] rounded-full text-2xl font-bold py-5 text-center">
          Selamat datang di UPT SMPN 9 Binamu News! Kami hadir untuk menyajikan
          informasi terkini seputar kegiatan, prestasi, dan perkembangan di
          sekolah kita.
        </h1>
        <h2 className="text-[#154472] text-4xl font-bold py-2 pt-8 text-center">
          UPT SMP NEGERI 9 BINAMU JENEPONTO
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6 pb-16">
        {berita.map((item) => (
          <div key={item.id} className="relative group">
            <Link href={`/Berita1?id=${item.id}`}>
              <img
                src={`http://localhost:8000/storage/${item.thumbnail}`}
                alt={item.judul}
                className="w-full h-[250px] object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/default-image.png"; // Gambar default jika gagal load
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-white text-xl font-bold">
                {item.judul}
              </div>
            </Link>
            <Link
              href={`/Berita1?id=${item.id}`}
              className="absolute top-2 right-2 bg-gray-800 rounded-full p-2 shadow-md hover:bg-[#154472]"
            >
              ➤
            </Link>
          </div>
        ))}
      </div>
      <Card/>
    </>
  );
}

export default Berita;
