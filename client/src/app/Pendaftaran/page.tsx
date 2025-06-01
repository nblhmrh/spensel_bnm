"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaSignOutAlt,
  FaHome,
  FaUserPlus,
  FaBullhorn,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";
import logo from "@/assets/logo.png";
import Image from "next/image";
import student from "@/assets/student.png";
import parents from "@/assets/parents.png";
import upload from "@/assets/upload.png";

export default function Pendaftaran() {
  const router = useRouter();
  const [sidebarTerbuka, setSidebarTerbuka] = useState(true);

  // Proteksi role user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      router.replace("/Welcome");
      return;
    }
    let userObj;
    try {
      userObj = JSON.parse(user);
    } catch {
      router.replace("/Welcome");
      return;
    }
    if (!userObj.role || userObj.role !== "user") {
      router.replace("/Welcome");
    }
  }, [router]);

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
    localStorage.removeItem("user");
    router.replace("/Welcome");
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
            onClick={() => router.push("/Berandappdb")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <FaHome className="text-xl mr-2" />
            {sidebarTerbuka && "Beranda"}
          </button>
          <button
            onClick={() => router.push("/Pendaftaran")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg bg-blue-100 font-semibold text-blue-800 hover:bg-gray-100 transition-all"
          >
            <FaUserPlus className="text-xl mr-2" />
            {sidebarTerbuka && "Pendaftaran"}
          </button>
          <button
            onClick={() => router.push("/Pengumuman")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg  hover:bg-gray-100 transition-all"
          >
            <FaBullhorn className="text-xl mr-2" />
            {sidebarTerbuka && "Pengumuman"}
          </button>
          <button
            onClick={() => router.push("/Bantuan")}
            className="flex items-center text-left w-full px-3 py-2 rounded-lg  hover:bg-gray-100 transition-all"
          >
            <FaQuestionCircle className="text-xl mr-2" />
            {sidebarTerbuka && "Bantuan"}
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
        <button
          onClick={() => router.push("/Berandappdb")}
          className="text-blue-800 flex items-center mb-4"
        >
          <FaArrowLeft className="mr-2" /> Kembali
        </button>
        <h1 className="text-3xl font-bold text-[#154472]">Pendaftaran</h1>
        <p className="text-gray-600">Silahkan isi data diri kamu dengan benar.</p>

        <div className="bg-[#154472] text-white p-4 rounded-lg mt-4">
          Silahkan selesaikan pendaftaran Anda. Jika status pendaftaran sudah terverifikasi, Anda bisa melakukan Unggah Dokumen persyaratan!
        </div>

        {/* Pilihan Pendaftaran */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Data Peserta Didik */}
          <div
            className="bg-[#154472] text-white p-6 rounded-xl text-center cursor-pointer shadow-lg hover:bg-[#123A60] transition-all"
            onClick={() => router.push("/Datasiswa")}
          >
            <Image
              src={student}
              alt="Data Peserta Didik"
              className="mx-auto w-16 h-16 mb-2"
            />
            <h3 className="text-lg font-semibold">Data Peserta Didik</h3>
            <p className="text-sm mt-2 border border-white px-3 py-1 inline-block rounded-md">
              isi data &gt;
            </p>
          </div>

          {/* Data Orang Tua/Wali */}
          <div
            className="bg-[#154472] text-white p-6 rounded-xl text-center cursor-pointer shadow-lg hover:bg-[#123A60] transition-all"
            onClick={() => router.push("/Dataortu")}
          >
            <Image
              src={parents}
              alt="Data Orang Tua/Wali"
              className="mx-auto w-16 h-16 mb-2"
            />
            <h3 className="text-lg font-semibold">Data Orang Tua/Wali</h3>
            <p className="text-sm mt-2 border border-white px-3 py-1 inline-block rounded-md">
              isi data &gt;
            </p>
          </div>

          {/* Unggah Berkas */}
          <div
            className="bg-[#154472] text-white p-6 rounded-xl text-center cursor-pointer shadow-lg hover:bg-[#123A60] transition-all"
            onClick={() =>
              window.open(
                "https://forms.gle/MCTMeZpqukH4DUhq9",
                "_blank"
              )
            }
          >
            <Image
              src={upload}
              alt="Unggah Berkas"
              className="mx-auto w-16 h-16 mb-2"
            />
            <h3 className="text-lg font-semibold">Unggah Berkas</h3>
            <p className="text-sm mt-2 border border-white px-3 py-1 inline-block rounded-md">
              isi data &gt;
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
