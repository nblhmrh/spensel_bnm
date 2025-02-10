"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import {
    FaSignOutAlt,
    FaHome,
    FaUserPlus,
    FaBullhorn,
    FaQuestionCircle,
  } from "react-icons/fa"
  import logo from '@/assets/logo.png'
  import student from '@/assets/student.png'
  import parents from '@/assets/parents.png'
  import upload from '@/assets/upload.png'
export default function Pendaftaran() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
       {/* Sidebar */}
       <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <div>
          {/* Logo dan Nama Sekolah */}
          <div className="mr-6">
            <Image src={logo} width={80} height={80} alt="Logo Sekolah" />
          </div>
          <h2 className="text-right font-bold text-lg flex-2 text-gray-800">
            UPT SMPN 9 Binamu
          </h2>

          {/* Menu Navigasi */}
          <nav className="text-[#154472] space-y-4 mt-4">
            <button className="flex items-center text-left w-full px-4 py-2 bg-blue-100 rounded-lg font-semibold text-blue-800">
              <FaHome className="mr-2" /> Beranda
            </button>
            <button
              onClick={() => router.push("/Pendaftaran")}
              className="flex items-center text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg"
            >
              <FaUserPlus className="mr-2" /> Pendaftaran
            </button>
            <button
              onClick={() => router.push("/pengumuman")}
              className="flex items-center text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg"
            >
              <FaBullhorn className="mr-2" /> Pengumuman
            </button>
            <button
              onClick={() => router.push("/bantuan")}
              className="flex items-center text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg"
            >
              <FaQuestionCircle className="mr-2" /> Bantuan
            </button>
          </nav>
        </div>
        {/* Tombol Keluar */}
        <button
        onClick={() => router.push("/Welcome")}
          className="mt-auto bg-[#154472] text-white py-2 flex items-center justify-center rounded-lg hover:bg-red-800"
        >
          <FaSignOutAlt className="mr-2" /> Keluar
        </button>
      </aside>
      
      {/* Konten */}
      <main className="flex-1 p-8">
        <button onClick={() => router.push("/Berandappdb")} className="text-blue-800 flex items-center mb-4">
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
        onClick={() => router.push("/pendaftaran/data-peserta")}
      >
        <Image src={student} alt="Data Peserta Didik" className="mx-auto w-16 h-16 mb-2" />
        <h3 className="text-lg font-semibold">Data Peserta Didik</h3>
        <p className="text-sm mt-2 border border-white px-3 py-1 inline-block rounded-md">
          isi data &gt;
        </p>
      </div>

      {/* Data Orang Tua/Wali */}
      <div
        className="bg-[#154472] text-white p-6 rounded-xl text-center cursor-pointer shadow-lg hover:bg-[#123A60] transition-all"
        onClick={() => router.push("/pendaftaran/data-ortu")}
      >
        <Image src={parents} alt="Data Orang Tua/Wali" className="mx-auto w-16 h-16 mb-2" />
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
            "https://docs.google.com/forms/d/e/1FAIpQLSdxK",
            "_blank"
          )
        }
      >
        <Image src={upload} alt="Unggah Berkas" className="mx-auto w-16 h-16 mb-2" />
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
