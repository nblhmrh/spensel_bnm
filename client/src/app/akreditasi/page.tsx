"use client";

import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
import News from "@/pages/News";
import { FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "@/utils/api";

function Akreditasi() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await API.get("/akreditasi");
      setData(res.data);
    } catch (error) {
      console.error("Error detail:", error.response?.data);
      console.error("Error fetching akreditasi:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Fungsi untuk menangani perubahan storage
    const handleStorageChange = () => {
      const lastUpdate = localStorage.getItem('akreditasi_updated');
      if (lastUpdate) {
        fetchData();
        // Hapus flag setelah digunakan
        localStorage.removeItem('akreditasi_updated');
      }
    };

    // Tambahkan event listener untuk storage dan custom event
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('akreditasi_updated', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('akreditasi_updated', handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            Akreditasi
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className="hover:text-gray-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link href="/akreditasi" className="hover:text-gray-300">
              Akreditasi
            </Link>
          </p>
        </section>
      </div>
      
      <div>
        <h1 className="text-3xl text-[#154472] font-semibold px-6 py-8">
          Akreditasi UPT SMPN 9 Binamu
        </h1>
        <p className="bg-gray-200 text-center px-8 py-1 rounded-full text-2xl text-blue-900 font-bold">
          Berikut adalah dokumen akreditasi sekolah kami yang menunjukkan komitmen kami <br/>
          terhadap standar pendidikan yang berkualitas.
        </p>
      </div>

      <div className="py-16 px-12">
        {data.map((item, i) => (
          <div key={i} className="mb-8 flex flex-col items-center justify-center">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-[#154472]">{item.instansi}</h2>
              <p className="text-gray-600">No SK: {item.no_sk}</p>
              <p className="text-gray-600">NPSN: {item.npsn}</p>
            </div>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/akreditasi/download/${item.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 flex items-center gap-2 text-white bg-[#154472] hover:bg-[#1a5a99] transition-all font-medium py-2 px-4 rounded-lg cursor-pointer"
            >
              <FaDownload />
              Download Dokumen
            </a>
            <Image
              src={`http://localhost:8000/storage/${item.file}`}
              alt="Dokumen Akreditasi"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
      <News />
    </>
  );
}

export default Akreditasi;
