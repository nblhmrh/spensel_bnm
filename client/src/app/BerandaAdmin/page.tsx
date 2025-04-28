"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import {
  FaSignOutAlt,
  FaHome,
  FaSchool,
  FaPhone,
  FaTrophy,
  FaBuilding,
  FaSitemap,
  FaNewspaper,
  FaImage,
  FaUserTie,
  FaMedal,
} from "react-icons/fa";

// Add this near the top of the component
export default function Dashboard({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [activePath, setActivePath] = useState('/BerandaAdmin');

  // Add handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.history.replaceState(null, "", "/PPDB");
    router.push("/Welcome");
  };

  // Update navigation handlers to set active path


  const handleNavigateToDashboard = () => {
    setActivePath('/BerandaAdmin');
    router.push("/BerandaAdmin");
  };

  const handleNavigateToVisiMisi = () => {
    setActivePath('/VisiMisiAdmin');
    router.push("/VisiMisiAdmin");
  };

  const handleNavigateToSambutan = () => {
    setActivePath('/SambutanAdmin');
    router.push("/SambutanAdmin");
  };

  const handleNavigateToAkreditasiAdmin = () => {
    setActivePath('/AkreditasiAdmin');
    router.push("/AkreditasiAdmin");
  };
  const handleNavigateToHubungiKamiAdmin = () => {
    setActivePath('/HubungiKamiAdmin');
    router.push("/HubungiKamiAdmin");
  };
  const handleNavigateToStrukturadmin = () => {
    setActivePath('/StrukturAdmin');
    router.push("/StrukturAdmin");
  };
  const handleNavigateToFotoSekolahAdmin = () => {
    setActivePath('/FotoSekolahAdmin');
    router.push("/FotoSekolahAdmin");
  };

  const handleNavigateToFasilitasAdmin = () => {
    setActivePath('/FasilitasAdmin');
    router.push("/FasilitasAdmin");
  };

  // Update button classes to include active state
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <div className="flex flex-col">
          {/* Logo dan Nama Sekolah */}
          <div className="flex flex-col items-center mb-6">
            <Image src={logo} width={80} height={80} alt="Logo Sekolah" />
            <h2 className="font-bold text-lg text-gray-800 mt-2">
              UPT SMPN 9 Binamu
            </h2>
          </div>

          {/* Menu Navigasi */}
          <nav className="text-[#154472] space-y-4 mt-4">
            {/* Main */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">MAIN</p>
              <button 
                onClick={handleNavigateToDashboard}
                className={`flex items-center text-left w-full px-4 py-2 rounded-lg font-semibold ${
                  activePath === '/BerandaAdmin' 
                    ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]' 
                    : 'hover:bg-gray-200'
                }`}
              >
                <FaHome className="mr-2" /> Dashboard
              </button>
            </div>

            {/* Beranda */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">BERANDA</p>
              <div className="space-y-2">
                <button 
                  onClick={handleNavigateToFotoSekolahAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === '/FotoSekolahAdmin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <FaImage className="mr-2" /> Foto Sekolah
                </button>
                <button
                  onClick={handleNavigateToSambutan}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === '/SambutanAdmin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <FaUserTie className="mr-2" /> Sambutan Kepala Sekolah
                </button>
                <button className="flex items-center text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg">
                  <FaNewspaper className="mr-2" /> Berita
                </button>
              </div>
            </div>

            {/* Tentang Kami */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">TENTANG KAMI</p>
              <div className="space-y-2">
                <button
                  onClick={handleNavigateToVisiMisi}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === '/VisiMisiAdmin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <FaSchool className="mr-2" /> Visi Misi
                </button>
                <button
                  onClick={handleNavigateToFasilitasAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === '/FasilitasAdmin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <FaBuilding className="mr-2" /> Fasilitas
                </button>
                <button className="flex items-center text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg">
                  <FaTrophy className="mr-2" /> Prestasi
                </button>
                <button
                  onClick={handleNavigateToStrukturadmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === '/StrukturAdmin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <FaSitemap className="mr-2" /> Struktur Organisasi
                </button>
                <button
                  onClick={handleNavigateToAkreditasiAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === '/AkreditasiAdmin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <FaMedal className="mr-2" /> Akreditasi
                </button>
              </div>
            </div>

            {/* Footer */}
            <div>
              <p className="text-sm text-gray-500 mb-2">FOOTER</p>
              <button
                  onClick={handleNavigateToHubungiKamiAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === '/HubungiKamiAdmin'
                      ? 'bg-blue-100 text-blue-800 border-2 border-[#154472]'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <FaPhone className="mr-2" /> Hubungi Kami
                </button>
            </div>
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
        {children || (
          <>
            <h1 className="text-3xl font-bold text-[#154472]">Beranda Admin</h1>
            <p className="text-gray-600">
              Berikut informasi yang kamu butuhkan ada di sini
            </p>

            {/* Sistem Pendaftaran */}
            <div className="mt-6 bg-[#154472] text-white rounded-lg p-5 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                List Para peserta yang mendaftar{" "}
              </h2>
            </div>
            {/* Data Pengguna */}
            <div className="bg-white shadow-md mt-4">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-[#154472] text-white text-center">
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Data Peserta didik</th>
                    <th className="p-2 border">Data Orang Tua/Wali</th>
                    <th className="p-2 border">Lulus/Tidak</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border text-gray-800 text-center">
                    <td className="p-5 border">dikiji288@gmail.com</td>
                    <td className="p-5 border items-center justify-center ">
                      <button className="bg-[#154472] text-white px-3 py-2 rounded-md ">
                        Tampilkan
                      </button>
                    </td>
                    <td className="p-5 border">
                      <button className="bg-[#154472] text-white px-3 py-2 rounded-md ">
                        Tampilkan
                      </button>
                    </td>
                    <td className="p-5 border">
                      <div className="flex justify-center gap-2">
                        <button className="bg-green-500 text-white px-3 py-2 rounded-md">
                          Lulus
                        </button>
                        <button className="bg-red-500 text-white px-3 py-2 rounded-md">
                          Gagal
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="border text-gray-800 text-center">
                    <td className="p-5 border">dikimks288@gmail.com</td>
                    <td className="p-5 border items-center justify-center ">
                      <button className="bg-[#154472] text-white px-3 py-2 rounded-md ">
                        Tampilkan
                      </button>
                    </td>
                    <td className="p-5 border">
                      <button className="bg-[#154472] text-white px-3 py-2 rounded-md ">
                        Tampilkan
                      </button>
                    </td>
                    <td className="p-5 border">
                      <div className="flex justify-center gap-2">
                        <button className="bg-green-500 text-white px-3 py-2 rounded-md">
                          Lulus
                        </button>
                        <button className="bg-red-500 text-white px-3 py-2 rounded-md">
                          Gagal
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="border text-gray-800 text-center">
                    <td className="p-5 border">adatonog@gmail.com</td>
                    <td className="p-5 border items-center justify-center ">
                      <button className="bg-[#154472] text-white px-3 py-2 rounded-md ">
                        Tampilkan
                      </button>
                    </td>
                    <td className="p-5 border">
                      <button className="bg-[#154472] text-white px-3 py-2 rounded-md ">
                        Tampilkan
                      </button>
                    </td>
                    <td className="p-5 border">
                      <div className="flex justify-center gap-2">
                        <button className="bg-green-500 text-white px-3 py-2 rounded-md">
                          Lulus
                        </button>
                        <button className="bg-red-500 text-white px-3 py-2 rounded-md">
                          Gagal
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
