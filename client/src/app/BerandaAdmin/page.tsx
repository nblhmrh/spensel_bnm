"use client";

import { useState, useEffect } from "react";
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
import axios from "axios";

export default function Dashboard({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const [activePath, setActivePath] = useState("/BerandaAdmin");
  const [pendaftar, setPendaftar] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!userObj.role || userObj.role !== "admin") {
      router.replace("/Welcome");
    }
  }, [router]);

  // Ambil data pendaftar dari backend
  useEffect(() => {
    const fetchPendaftar = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/admin/pendaftar", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendaftar(res.data.data || []);
      } catch (err) {
        setPendaftar([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPendaftar();
  }, []);

  const handleStatus = async (userId: number, status: "lulus" | "gagal") => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/admin/pendaftar/${userId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendaftar((prev) =>
        prev.map((p) =>
          p.id === userId ? { ...p, status } : p
        )
      );
    } catch {
      alert("Gagal mengubah status.");
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    localStorage.removeItem("token");
    window.history.replaceState(null, "", "/PPDB");
    router.push("/Welcome");
  };

  const handleNavigateToDashboard = () => {
    setActivePath("/BerandaAdmin");
    router.push("/BerandaAdmin");
  };

  const handleNavigateToVisiMisi = () => {
    setActivePath("/VisiMisiAdmin");
    router.push("/VisiMisiAdmin");
  };

  const handleNavigateToSambutan = () => {
    setActivePath("/SambutanAdmin");
    router.push("/SambutanAdmin");
  };

  const handleNavigateToAkreditasiAdmin = () => {
    setActivePath("/AkreditasiAdmin");
    router.push("/AkreditasiAdmin");
  };
  const handleNavigateToHubungiKamiAdmin = () => {
    setActivePath("/HubungiKamiAdmin");
    router.push("/HubungiKamiAdmin");
  };
  const handleNavigateToStrukturadmin = () => {
    setActivePath("/StrukturAdmin");
    router.push("/StrukturAdmin");
  };
  const handleNavigateToFotoSekolahAdmin = () => {
    setActivePath("/FotoSekolahAdmin");
    router.push("/FotoSekolahAdmin");
  };

  const handleNavigateToFasilitasAdmin = () => {
    setActivePath("/FasilitasAdmin");
    router.push("/FasilitasAdmin");
  };

  const handleNavigateToBeritaAdmin = () => {
    setActivePath("/BeritaAdmin");
    router.push("/BeritaAdmin");
  };
  const handleNavigateToPrestasiAdmin = () => {
    setActivePath("/PrestasiAdmin");
    router.push("/PrestasiAdmin");
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
                  activePath === "/BerandaAdmin"
                    ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                    : "hover:bg-gray-200"
                }`}
              >
                <FaHome className="mr-2" /> Dashboard
              </button>
              {/* Tombol Tambah Akun di bawah Dashboard */}
              <button
                onClick={() => {
                  setActivePath("/BuatAkun");
                  router.push("/BuatAkun");
                }}
                className={`flex items-center text-left w-full px-4 py-2 mt-2 rounded-lg font-semibold ${
                  activePath === "/BuatAkun"
                    ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                    : "hover:bg-gray-200"
                }`}
              >
                <FaUserTie className="mr-2" /> Tambah Akun
              </button>
            </div>

            {/* Beranda */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">BERANDA</p>
              <div className="space-y-2">
                <button
                  onClick={handleNavigateToFotoSekolahAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === "/FotoSekolahAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaImage className="mr-2" /> Foto Sekolah
                </button>
                <button
                  onClick={handleNavigateToSambutan}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === "/SambutanAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaUserTie className="mr-2" /> Sambutan Kepala Sekolah
                </button>
                <button
                  onClick={handleNavigateToBeritaAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === "/BeritaAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
                  }`}
                >
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
                    activePath === "/VisiMisiAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaSchool className="mr-2" /> Visi Misi
                </button>
                <button
                  onClick={handleNavigateToFasilitasAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === "/FasilitasAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaBuilding className="mr-2" /> Fasilitas
                </button>
                <button
                  onClick={handleNavigateToPrestasiAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === "/PrestasiAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaTrophy className="mr-2" /> Prestasi
                </button>
                <button
                  onClick={handleNavigateToStrukturadmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === "/StrukturAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaSitemap className="mr-2" /> Struktur Organisasi
                </button>
                <button
                  onClick={handleNavigateToAkreditasiAdmin}
                  className={`flex items-center text-left w-full px-4 py-2 rounded-lg ${
                    activePath === "/AkreditasiAdmin"
                      ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                      : "hover:bg-gray-200"
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
                  activePath === "/HubungiKamiAdmin"
                    ? "bg-blue-100 text-blue-800 border-2 border-[#154472]"
                    : "hover:bg-gray-200"
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

            <div className="mt-6 bg-[#154472] text-white rounded-lg p-5 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                List Para peserta yang mendaftar
              </h2>
            </div>
            <div className="bg-white shadow-md mt-4 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-[#154472] text-white text-center">
                    <th className="p-2 border">Nama Peserta</th>
                    <th className="p-2 border">Data Peserta Didik</th>
                    <th className="p-2 border">Data Orang Tua/Wali</th>
                    <th className="p-2 border">Berkas</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">Memuat data...</td>
                    </tr>
                  ) : pendaftar.filter((p) => !p.status).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">Belum ada pendaftar.</td>
                    </tr>
                  ) : (
                    pendaftar
                      .filter((p) => !p.status) // Hanya tampilkan yang belum punya status
                      .map((p) => (
                        <tr key={p.id} className="border text-gray-800 text-center">
                          <td className="p-5 border">{p.datasiswa?.nama || "-"}</td>
                          <td className="p-5 border">
                            <button
                              className="bg-[#154472] text-white px-3 py-2 rounded-md"
                              onClick={() => router.push(`/AdminDetailSiswa/${p.id}`)}
                            >
                              Tampilkan
                            </button>
                          </td>
                          <td className="p-5 border">
                            <button
                              className="bg-[#154472] text-white px-3 py-2 rounded-md"
                              onClick={() => router.push(`/AdminDetailOrtu/${p.id}`)}
                            >
                              Tampilkan
                            </button>
                          </td>
                          <td className="p-5 border">
                            <button
                              className="bg-[#154472] text-white px-3 py-2 rounded-md"
                              onClick={() => router.push(`/AdminDetailBerkas/${p.id}`)}
                            >
                              Tampilkan
                            </button>
                          </td>
                          <td className="p-5 border">
                            <div className="flex justify-center gap-2">
                              <button
                                className="bg-green-500 text-white px-3 py-2 rounded-md"
                                onClick={() => {
                                  handleStatus(p.id, "lulus");
                                  alert("Status sudah tidak bisa diubah!");
                                }}
                              >
                                Lulus
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-2 rounded-md"
                                onClick={() => {
                                  handleStatus(p.id, "gagal");
                                  alert("Status sudah tidak bisa diubah!");
                                }}
                              >
                                Gagal
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
