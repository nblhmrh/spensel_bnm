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
  FaInfoCircle,
} from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import akun from "@/assets/akun.png";
import datadiri from "@/assets/datadiri.png";
import berkas from "@/assets/berkas.png";
import pengumuman from "@/assets/pengumuman.png";
import Modal from "@/pages/Modal";

export default function Dashboard() {
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
  const [showInfo, setShowInfo] = useState(false);

  // Data Pengguna
  const user = {
    id: "",
    name: "",
    email: "",
    whatsapp: "",
  };


  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    window.history.replaceState(null, '', '/PPDB'); 
    router.push("/Welcome");
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
          className="flex items-center text-left w-full px-3 py-2 rounded-lg  bg-blue-100 font-semibold text-blue-800  hover:bg-gray-100 transition-all"
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
          className="flex items-center text-left w-full px-3 py-2 rounded-lghover:bg-gray-100 transition-all"
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

      {/* Konten */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#154472]">Beranda</h1>
        <p className="text-gray-600">
          Berikut informasi yang kamu butuhkan ada di sini
        </p>

        {/* Data Pengguna */}
        <div className="bg-white shadow-md mt-4">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#154472] text-white text-center">
                <th className="p-2 border">No. Pendaftaran</th>
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Nomor WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border text-gray-800 text-center">
                <td className="p-5 border">{user.id}</td>
                <td className="p-5 border">{user.name}</td>
                <td className="p-5 border">{user.email}</td>
                <td className="p-5 border">{user.whatsapp}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sistem Pendaftaran */}
        <div className="mt-6 bg-[#154472] text-white rounded-lg p-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sistem Pendaftaran</h2>
          <button
            onClick={() => setShowInfo(true)}
            className="text-white text-2xl"
          >
            <FaInfoCircle />
          </button>
        </div>

        {/* Urutan Sistem Pendaftaran */}
        <div className="grid grid-cols-4 gap-6 mt-4 text-gray-700">
          {[
            { icon: akun, text: "Buat Akun" },
            { icon: datadiri, text: "Isi Data Diri" },
            { icon: berkas, text: "Unggah Berkas" },
            { icon: pengumuman, text: "Pengumuman" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 text-center rounded-lg text-[#154472]"
            >
              <span className="block text-lg font-semibold text-left">
                {index + 1}
              </span>
              <Image
                src={item.icon}
                width={80}
                height={80}
                alt={item.text}
                className="mx-auto mb-2"
              />
              <p className="text-lg font-semibold">{item.text}</p>
            </div>
          ))}
        </div>
      </main>

      {showInfo && (
        <Modal onClose={() => setShowInfo(false)}>
          <div className="bg-white text-[#154472] w-[950px] h-[300px] rounded-lg p-6 mt-8 flex items-center justify-between">
            {/* Tulisan di sebelah kiri */}
            <div className="flex-1">
              <ol className="mt-2 text-left list-decimal text-lg pl-4 space-y-2">
                <li>
                  <b>Buat Akun</b>: Silahkan buat akun untuk daftar di SMP 9
                  BINAMU.
                </li>
                <li>
                  <b>Isi Data Diri</b>: Masukkan data diri, data orang tua/wali,
                  asal sekolah, dan konsentrasi keahlian.
                </li>
                <li>
                  <b>Unggah Berkas</b>: Siapkan berkas seperti pas foto, rapor,
                  ijazah, surat keterangan lulus, dan dokumen lainnya.
                </li>
                <li>
                  <b>Pengumuman</b>: Cek hasil seleksi di menu pengumuman.
                </li>
              </ol>
            </div>

            {/* Logo di sebelah kanan */}
            <div className="ml-6">
              <Image src={logo} width={220} height={220} alt="Logo Sekolah" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}