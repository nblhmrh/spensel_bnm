"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/logo.png";
import {
  FaSignOutAlt,
  FaInfoCircle,
  FaHome,
  FaUserPlus,
  FaBullhorn,
  FaQuestionCircle,
} from "react-icons/fa";
import akun from "@/assets/akun.png";
import datadiri from "@/assets/datadiri.png";
import berkas from "@/assets/berkas.png";
import pengumuman from "@/assets/pengumuman.png";
import Modal from "@/pages/Modal";

export default function Dashboard() {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);

  // Data Pengguna
  const user = {
    id: "T8287396jdjow4629",
    name: "utipatotie",
    email: "mutiaqamilamarsyah@gmail.com",
    whatsapp: "0812345678910",
  };


  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    window.history.replaceState(null, '', '/PPDB'); 
    router.push("/Welcome");
  }; 

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <div className="flex flex-col">
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
              onClick={() => router.push("/Pengumuman")}
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
          onClick={handleLogout}
          className="mt-auto bg-[#154472] text-white py-2 flex items-center justify-center rounded-lg hover:bg-red-800"
        >
          <FaSignOutAlt className="mr-2" /> Keluar
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