"use client";

import { useState, useEffect } from "react";
import {
  FaSignOutAlt,
  FaHome,
  FaBook,
  FaHandsHelping,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaUserTie, // Tambahkan import untuk ikon profil
} from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";

export default function BerandaBK({
  children,
}: {
  children?: React.ReactNode;
}) {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
            onClick={() => router.push("/BerandaBK")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg bg-blue-100 font-semibold text-blue-800 hover:bg-gray-100 transition-all"
          >
            <FaHome className="text-xl mr-2" />
            {sidebarTerbuka && "Beranda"}
          </button>
          <button
            onClick={() => router.push("/ProfilBK")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <FaUserTie className="text-xl mr-2" />
            {sidebarTerbuka && "Profil BK"}
          </button>
          <button
            onClick={() => router.push("/DokumentasiBK")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <FaBook className="text-xl mr-2" />
            {sidebarTerbuka && "Dokumentasi BK"}
          </button>
          <button
            onClick={() => router.push("/LayananBK")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <FaHandsHelping className="text-xl mr-2" />
            {sidebarTerbuka && "Layanan BK"}
          </button>
          <button
            onClick={() => router.push("/PengaduanBK")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <FaExclamationTriangle className="text-xl mr-2" />
            {sidebarTerbuka && "Pengaduan"}
          </button>
        </nav>

        {/* Tombol Keluar */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-[#154472] text-white py-2 flex items-center justify-center rounded-lg hover:bg-red-800 transition-all"
        >
          <FaSignOutAlt className="text-lg mr-2" />
          {sidebarTerbuka && "Keluar"}
        </button>
      </aside>

      {/* Konten */}
      <main className="flex-1 p-8">
        {children || (
          <>
            <h1 className="text-3xl font-bold text-[#154472] mb-6">
              Selamat Datang di Portal BK
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dokumentasi BK */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <FaBook className="text-4xl text-[#154472] mb-4" />
                <h2 className="text-xl font-semibold text-[#154472] mb-2">
                  Dokumentasi BK
                </h2>
                <p className="text-gray-600">
                  Akses dan kelola dokumentasi bimbingan konseling siswa
                </p>
              </div>

              {/* Layanan BK */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <FaHandsHelping className="text-4xl text-[#154472] mb-4" />
                <h2 className="text-xl font-semibold text-[#154472] mb-2">
                  Layanan BK
                </h2>
                <p className="text-gray-600">
                  Layanan konsultasi dan bimbingan untuk siswa
                </p>
              </div>

              {/* Pengaduan */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <FaExclamationTriangle className="text-4xl text-[#154472] mb-4" />
                <h2 className="text-xl font-semibold text-[#154472] mb-2">
                  Pengaduan
                </h2>
                <p className="text-gray-600">
                  Sistem pengaduan dan pelaporan masalah siswa
                </p>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-[#154472] mb-4">
                Informasi BK
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p>
                  Bimbingan Konseling (BK) UPT SMP 9 Binamu berkomitmen untuk memberikan
                  layanan konseling yang berkualitas dan mendukung perkembangan
                  akademik serta pribadi siswa. Kami menyediakan berbagai layanan
                  termasuk:
                </p>
                <ul className="mt-4 space-y-2">
                  <li>Konseling Individual</li>
                  <li>Bimbingan Karir</li>
                  <li>Konseling Kelompok</li>
                  <li>Konsultasi Akademik</li>
                  <li>Pengembangan Karakter</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}