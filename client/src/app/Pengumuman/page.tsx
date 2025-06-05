"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import {
  FaSignOutAlt,
  FaHome,
  FaUserPlus,
  FaBullhorn,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import logo from "@/assets/logo.png";
import axios from "axios";

export default function Pengumuman() {
  const router = useRouter();
  const [sidebarTerbuka, setSidebarTerbuka] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [hasil, setHasil] = useState<null | {
    status: string;
    nama: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!keyword.trim()) return;
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/Pengumuman",
        { keyword }
      );
      if (response.data && response.data.status) {
        setHasil(response.data);
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      setHasil({
        status: "belum_ada",
        nama: keyword,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    router.push("/Welcome");
  };

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

      {/* Logo dan Judul */}
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
          className="flex items-center text-left w-full px-3 py-2 rounded-lg bg-blue-100 font-semibold text-blue-80" 
        >
          <FaBullhorn className="text-xl mr-2" />
          {sidebarTerbuka && "Pengumuman"}
        </button>
        <button
          onClick={() => router.push("/Bantuan")}
          className="flex items-center text-left w-full px-3 py-2 rounded-lg  0 hover:bg-gray-100 transition-all"
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

      <main className="flex-1 p-10 bg-[#f4f7fc] min-h-screen">
        <h1 className="text-3xl font-bold text-[#154472] mb-2">Pengumuman</h1>
        <p className="text-gray-400 mb-6">Cek status kelulusanmu di sini!</p>

        <div className="bg-[#154472] px-8 py-2 rounded-md shadow-md mb-6 w-fit">
          <h1 className="text-left items-left text-white text-1xl font-medium">
            Cek Pengumuman UPT SMPN 9 BINAMU JENEPONTO{" "}
          </h1>
          <span className="font-normal">disini !</span>
        </div>

        {!hasil && (
          <div className="text-[#154472] max-w-xl">
            <p className="font-bold mb-4">
              Masukkan <b>Nama Lengkap</b>, <b>Email</b>, atau <b>No WhatsApp</b> kamu untuk cek status kelulusan!
            </p>
            <input
              type="text"
              placeholder="Cari berdasarkan nama, email, atau no WhatsApp"
              className="w-full p-3 border border-gray-300 rounded-md mb-6 text-sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="bg-[#154472] text-white px-6 py-3 rounded-md hover:bg-blue-800 w-full font-semibold"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Cek status kelulusan"}
            </button>
          </div>
        )}

        {hasil && (
          <div
            className={`mt-10 p-6 rounded-lg shadow-md max-w-xl text-white ${
              hasil.status === "lulus"
                ? "bg-green-600"
                : hasil.status === "tidak_lulus"
                ? "bg-red-600"
                : "bg-gray-500"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2 text-center">
              {hasil.status === "lulus"
                ? "SELAMAT ANDA LULUS!"
                : hasil.status === "tidak_lulus"
                ? "MAAF ANDA TIDAK LULUS"
                : "Pengumuman belum tersedia"}
            </h2>
            <div className="flex justify-center my-4">
              <div className="bg-white w-24 h-24 rounded-md" />
            </div>
            <p className="text-center font-semibold text-lg">{hasil.name}</p>
            {hasil.status !== "belum_ada" && (
              <p className="text-center mt-2">
                Anda dinyatakan{" "}
                <span className="font-bold uppercase">{hasil.status}</span> di
                UPT SMPN 9 BINAMU JENEPONTO.
              </p>
            )}
            <button
              onClick={() => setHasil(null)}
              className="mt-6 bg-white text-black px-4 py-2 rounded-md shadow mx-auto block"
            >
              <FaArrowLeft className="inline mr-2" /> Kembali
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
