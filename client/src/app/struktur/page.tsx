"use client";

import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
import News from "@/pages/News";
import { FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "@/utils/api";

function StrukturOrganisasi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/struktur").then(res => setData(res.data));
  }, []);

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            Struktur Organisasi
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
            <Link href="/struktur" className="hover:text-gray-300">
              Struktur Organisasi
            </Link>
          </p>
        </section>
      </div>
      
      <div>
        <h1 className="text-3xl text-[#154472] font-semibold px-6 py-8">
          Struktur Organisasi UPT SMPN 9 Binamu
        </h1>
        <p className="bg-gray-200 text-center px-8 py-1 rounded-full text-2xl text-blue-900 font-bold">
          Mari kita mengenal lebih dekat siapa saja yang berperan penting dalam menjalankan <br/>
          roda pendidikan di UPT SMPN 9 Binamu. Berikut adalah struktur organisasi sekolah kami.
        </p>
      </div>

      <div className="py-16 px-12">
        {data.map((item, i) => (
          <div key={i} className="mb-8 flex flex-col items-center justify-center">
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/struktur/download/${item.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 flex items-center gap-2 text-white bg-[#154472] hover:bg-[#1a5a99] transition-all font-medium py-2 px-4 rounded-lg cursor-pointer"
            >
              <FaDownload />
              Download Gambar
            </a>
            <Image
              src={`http://localhost:8000/storage/${item.file}`}
              alt="Struktur Organisasi"
              width={1300}
              height={1000}
              className="rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
      <News />
    </>
  );
}

export default StrukturOrganisasi;
