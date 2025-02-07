'use client';

import React from 'react';
import Image from 'next/image';
import gerbang from '@/assets/gerbang.png';
import logo from '@/assets/logo.png';
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function FAQPPDB() {
  return (
    <>
      {/* Header Section */}
      <div className="relative w-full h-[300px] flex flex-col items-center justify-center text-center text-white">
        <Image src={gerbang} alt="Gerbang Sekolah" layout="fill" objectFit="cover" quality={90} className="absolute z-0" />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="text-4xl font-bold z-10">FAQ PPDB</h1>
        <div className="relative z-10 mt-4">
          <div className="absolute inset-0 bg-blue-950 opacity-70 rounded-full " />
          <h2 className="relative rounded-full px-8 py-2 text-2xl font-semibold">Cari tahu cara menjadi siswa/i di UPT SMPN 9 Binamu</h2>
        </div>
        <button className="z-10 mt-6 px-6 py-3 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-black transition">
          Klik disini
        </button>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#154472] text-white py-8 px-6 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        
        {/* Kiri: Logo & Sosial Media */}
        <div className="flex flex-row items-center md:items-start">
          {/* Logo */}
          <Image src={logo} alt="Logo Sekolah" width={120} height={120} />
          
          {/* Copyright */}
          <p className="text-sm text-center md:text-left mt-2 align-middle">
          Copyright © 2025 <br/> SMPN 9 Binamu | <br/> Rinuvella | <br/> All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-24 left-11">
            <FaInstagram className="text-xl cursor-pointer hover:text-gray-300" />
            <FaFacebook className="text-xl cursor-pointer hover:text-gray-300" />
            <FaYoutube className="text-xl cursor-pointer hover:text-gray-300" />
            <FaTiktok className="text-xl cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        {/* Kanan: Informasi Kontak */}
        <div className="mt-8 md:mt-0 text-center md:text-left">
          <h3 className="font-semibold text-lg">Hubungi Kami</h3>
          <p className="mt-2">📍 Empoang, Kec. Binamu, Kabupaten Jeneponto, Sulawesi Selatan 92311</p>
          <p className="mt-1">📞 0411 088 222 333</p>
          <p className="mt-1">✉️ smpn9.binamu@gmail.com</p>
        </div>
      </div>
    </footer>
    </>
  );
}
