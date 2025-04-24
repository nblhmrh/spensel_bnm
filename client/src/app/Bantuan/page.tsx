"use client";

import { useState, useEffect } from "react";
import {
  FaSignOutAlt,
  FaHome,
  FaUserPlus,
  FaBullhorn,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
// import { FaArrowLeft } from "react-icons/fa";

// import axios from "axios";

export default function Bantuan() {
  const router = useRouter();
  const [sidebarTerbuka, setSidebarTerbuka] = useState(true);

  // Ambil dari localStorage saat pertama kali load
  useEffect(() => {
    const saved = localStorage.getItem("sidebarTerbuka");
    if (saved !== null) {
      setSidebarTerbuka(saved === "true");
    }
  }, []);

  // Simpan ke localStorage setiap kali sidebarTerbuka berubah
  useEffect(() => {
    localStorage.setItem("sidebarTerbuka", sidebarTerbuka.toString());
  }, [sidebarTerbuka]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
      className={`${
        sidebarTerbuka ? "w-64" : "w-20"
      } bg-white shadow-lg p-4 flex flex-col transition-all duration-300 relative`}
    >
      {/* Tombol Collapse */}
      <button
        onClick={() => setSidebarTerbuka(!sidebarTerbuka)}
        className="absolute -right-3 top-5 bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
      >
        {sidebarTerbuka ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Logo */}
      <div className="flex flex-col items-center">
        <Image
          src={logo}
          width={sidebarTerbuka ? 80 : 40}
          height={sidebarTerbuka ? 80 : 40}
          alt="Logo Sekolah"
          className="transition-all duration-300"
        />
        {sidebarTerbuka && (
          <h2 className="text-center font-bold text-lg text-gray-800 mt-2 leading-tight">
            UPT SMP 9 Binamu
            <br />
            <span className="text-sm font-medium">Jeneponto</span>
          </h2>
        )}
      </div>

      {/* Navigasi */}
      <nav className="text-[#154472] space-y-4 mt-6">
        <button
          onClick={() => router.push("/Berandappdb")}
          className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <FaHome className="text-xl mr-2" />
          {sidebarTerbuka && "Beranda"}
        </button>
        <button
          onClick={() => router.push("/Pendaftaran")}
          className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <FaUserPlus className="text-xl mr-2" />
          {sidebarTerbuka && "Pendaftaran"}
        </button>
        <button
          onClick={() => router.push("/Pengumuman")}
          className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <FaBullhorn className="text-xl mr-2" />
          {sidebarTerbuka && "Pengumuman"}
        </button>
        <button
          onClick={() => router.push("/Bantuan")}
          className="flex items-center text-left w-full px-3 py-2 rounded-lg bg-blue-100 font-semibold text-blue-800 hover:bg-gray-100 transition-all"
        >
          <FaQuestionCircle className="text-xl mr-2" />
          {sidebarTerbuka && "Bantuan"}
        </button>
      </nav>

      {/* Tombol Keluar */}
      <button
        onClick={() => router.push("/Welcome")}
        className="mt-auto bg-[#154472] text-white py-2 flex items-center justify-center rounded-lg hover:bg-red-800 transition-all"
      >
        <FaSignOutAlt className="text-lg mr-2" />
        {sidebarTerbuka && "Keluar"}
      </button>
    </aside>

      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-[#154472] mb-1">Bantuan</h1>
        <p className="text-gray-400 mb-6">Silakan hubungi kami kapan saja, kami siap membantu Anda</p>

        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Kontak Person */}
          <div className="space-y-6 w-full md:w-1/2">
            <h2 className="text-xl font-bold text-[#154472] flex items-center gap-2">
              <FaQuestionCircle className="text-2xl" /> Hubungi Kami
            </h2>

            {/* Daftar Kontak */}
            {[
              {
                nama: "Pak Fadjri",
                nomor: "+62 852-9964-5636",
                wa: "https://wa.me/6285299645636",
              },
              {
                nama: "Ma’am Susi",
                nomor: "+62 821-5465-8121",
                wa: "https://wa.me/6282154658121",
              },
              {
                nama: "Miss Nafilah",
                nomor: "+62 853-4378-9697",
                wa: "https://wa.me/6285343789697",
              },
            ].map((kontak, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#E8F0FE] p-2 rounded-full">
                    <svg
                      className="w-6 h-6 text-[#154472]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#154472] font-semibold">{kontak.nama}</p>
                    <p className="text-sm text-gray-500">{kontak.nomor}</p>
                  </div>
                </div>
                <a
                  href={kontak.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md"
                >
                  WhatsApp
                </a>
              </div>
            ))}
          </div>

          {/* Gambar Samping */}
          <div className="w-full md:w-1/3">
            <Image
              src="/images/kontak-bantuan.png" // ganti sesuai path gambar kamu
              alt="Kontak Guru"
              width={300}
              height={300}
              className="rounded-[30px] object-cover w-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
