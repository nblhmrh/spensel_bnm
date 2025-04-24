"use client";

import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
// import akreditasi from "@/assets/akreditasi.png";
import News from "@/pages/News";
import { FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "@/utils/api";


function Akreditasi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/akreditasi").then(res => setData(res.data));
  }, []);
  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
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

      <div className="p-6">
      <h1 className="text-3xl font-bold text-[#154472] mb-4">Akreditasi UPT SMPN 9 Binamu</h1>
      <p className="text-gray-700 mb-6">Berikut merupakan Akreditasi dari SMPN 9 Binamu Jeneponto</p>

      {data.map((item, i) => (
        <div key={i} className="mb-8 flex flex-col items-center justify-center">
          <a
            href={`http://localhost:8000/storage/${item.file}`}
            download
            className="mb-4 flex items-center gap-2 text-white bg-[#154472] hover:bg-[#1a5a99] transition-all font-medium py-2 px-4 rounded-lg"
          >
            <FaDownload />
            Download Gambar
          </a>
          <Image
            src={`http://localhost:8000/storage/${item.file}`}
            alt="akreditasi"
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

export default Akreditasi;
