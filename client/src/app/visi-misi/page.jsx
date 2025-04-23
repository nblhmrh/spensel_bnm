
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";

export default function VisiMisi() {
  const [data, setData] = useState({ visi: '', misi: '' })

  useEffect(() => {
    axios.get('http://localhost:8000/api/visi-misi')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [])
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Visi & Misi
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
            <Link href="/visi-misi" className=" hover:text-gray-300">
              Visi & Misi
            </Link>
          </p>
        </section>
      </div>

      {/* Visi & Misi Section */}
      <div className="p-6">
      <h1 className="text-xl font-bold text-center">Visi & Misi UPT SMPN 9 Binamu Jeneponto</h1>
      <div className="mt-6 space-y-4">
        <div>
          <h2 className="font-semibold text-lg text-blue-800">Visi</h2>
          <p>{data.visi}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg text-blue-800">Misi</h2>
          <p>{data.misi}</p>
        </div>
      </div>
    </div>
      <News />
    </>
  );
}
