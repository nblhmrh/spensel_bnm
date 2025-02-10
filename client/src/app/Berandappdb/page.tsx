"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import Modal from '@/pages/Modal' // Komponen Modal untuk pop-up

export default function Dashboard() {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false); // State untuk pop-up

  // Dummy Data Pengguna (Bisa diambil dari API)
  const user = {
    id: "T8287396jdjow4629",
    name: "utipatotie",
    email: "mutiaqamilamarsyah@gmail.com",
    whatsapp: "0812345678910",
  };

  const handleLogout = () => {
    // 🔹 Logout & Redirect ke Welcome
    alert("Anda telah keluar.");
    router.push("/welcome");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <Image src={logo} width={80} height={80} alt="Logo Sekolah" />
          </div>
          
          {/* Menu Navigasi */}
          <nav className="space-y-4">
            <button className="text-left w-full px-4 py-2 bg-blue-100 rounded-lg font-semibold text-blue-800">
              Beranda
            </button>
            <button onClick={() => router.push("/pendaftaran")} className="text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg">
              Pendaftaran
            </button>
            <button onClick={() => router.push("/pengumuman")} className="text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg">
              Pengumuman
            </button>
            <button onClick={() => router.push("/bantuan")} className="text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg">
              Bantuan
            </button>
          </nav>
        </div>

        {/* Tombol Keluar */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 flex items-center justify-center rounded-lg hover:bg-red-700"
        >
          <FaSignOutAlt className="mr-2" /> Keluar
        </button>
      </aside>

      {/* Konten */}
      <main className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#154472]">Beranda</h1>
        <p className="text-gray-600">Berikut informasi yang kamu butuhkan ada di sini</p>

        {/* Data Pengguna */}
        <div className="bg-white shadow-md rounded-lg p-5 mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#154472] text-white text-left">
                <th className="p-2">No. Pendaftaran</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Email</th>
                <th className="p-2">Nomor WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.whatsapp}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sistem Pendaftaran */}
        <div className="mt-6 bg-[#154472] text-white rounded-lg p-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sistem Pendaftaran</h2>
          {/* Tombol "i" untuk pop-up */}
          <button onClick={() => setShowInfo(true)} className="text-white text-2xl">
            <FaInfoCircle />
          </button>
        </div>

        {/* Urutan Sistem Pendaftaran */}
        <div className="grid grid-cols-4 gap-6 mt-4">
          <div className="bg-white shadow-lg p-4 text-center rounded-lg">
            <p className="text-lg font-semibold">Buat Akun</p>
          </div>

          <div className="bg-white shadow-lg p-4 text-center rounded-lg">
            <p className="text-lg font-semibold">Isi Data Diri</p>
          </div>

          <div className="bg-white shadow-lg p-4 text-center rounded-lg">
            <p className="text-lg font-semibold">Unggah Berkas</p>
          </div>

          <div className="bg-white shadow-lg p-4 text-center rounded-lg">
            <p className="text-lg font-semibold">Pengumuman</p>
          </div>
        </div>
      </main>

      {/* Pop-up Modal */}
      {showInfo && (
        <Modal onClose={() => setShowInfo(false)}>
          <h2 className="text-xl font-bold">Informasi Pendaftaran</h2>
          <p className="mt-2">
            Berikut adalah tahapan pendaftaran yang harus dilakukan oleh calon siswa:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Buat akun terlebih dahulu.</li>
            <li>Isi data diri dengan lengkap.</li>
            <li>Unggah berkas yang diperlukan.</li>
            <li>Tunggu pengumuman hasil seleksi.</li>
          </ul>
        </Modal>
      )}
    </div>
  );
}
