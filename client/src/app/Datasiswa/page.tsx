"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSignOutAlt, FaHome, FaUserPlus, FaBullhorn, FaQuestionCircle } from "react-icons/fa";
import Image from "next/image";
import logo from '@/assets/logo.png';
import axios from "axios";

export default function Pendaftaran() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nisn: "",
    nik: "",
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    asal_sekolah: "",
    alamat: "",
    desa: "",
    rt: "",
    rw: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    alamatlengkap: "",
    jarakrumah: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Mulai loading

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/datasiswa", formData);
      alert("Data berhasil dikirim!");
      console.log(response.data);
      router.push("/Berandappdb"); // Redirect ke halaman beranda setelah berhasil
    } catch (error) {
      console.error("Error mengirim data:", error);
      alert("Gagal mengirim data. Silakan coba lagi.");
    } finally {
      setIsLoading(false); // Berhenti loading
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <div>
          {/* Logo dan Nama Sekolah */}
          <div className="items-center">
            <Image src={logo} width={80} height={80} alt="Logo Sekolah" />
          </div>
          <h2 className="text-center font-bold text-lg flex-2 text-gray-800">
            UPT SMPN 9 Binamu
          </h2>

          {/* Menu Navigasi */}
          <nav className="text-[#154472] space-y-4 mt-4">
            <button 
              onClick={() => router.push("/Berandappdb")}
              className="flex items-center text-left w-full px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <FaHome className="mr-2" /> Beranda
            </button>
            <button
              onClick={() => router.push("/Pendaftaran")}
              className="flex items-center text-left w-full px-4 py-2 bg-blue-100 font-semibold text-blue-800 rounded-lg"
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
              onClick={() => router.push("/Bantuan")}
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

      {/* Formulir */}
      <main className="flex-1 p-10">
        <button onClick={() => router.push("/Pendaftaran")} className="text-blue-800 flex items-center mb-4">
          <FaArrowLeft className="mr-2" /> Kembali
        </button>
        <h1 className="text-2xl font-bold text-[#154472]">Isi Data Peserta Didik</h1>

        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">NISN Siswa</label>
              <input
                type="text"
                name="nisn"
                value={formData.nisn}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">No. Kartu Keluarga</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-semibold">Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                value={formData.jenis_kelamin}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold">Tempat Lahir</label>
              <input
                type="text"
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Tanggal Lahir</label>
            <input
              type="date"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Asal Sekolah</label>
            <input
              type="text"
              name="asal_sekolah"
              value={formData.asal_sekolah}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <h2 className="mt-6 font-bold text-lg">Alamat Lengkap</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <input
              type="text"
              name="desa"
              placeholder="Desa"
              value={formData.desa}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="rt"
              placeholder="RT"
              value={formData.rt}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="rw"
              placeholder="RW"
              value={formData.rw}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              name="kecamatan"
              placeholder="Kecamatan"
              value={formData.kecamatan}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="kabupaten"
              placeholder="Kabupaten"
              value={formData.kabupaten}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="provinsi"
              placeholder="Provinsi"
              value={formData.provinsi}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="alamatlengkap"
              placeholder="Alamat Lengkap"
              value={formData.alamatlengkap}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="jarakrumah"
              placeholder="Jarak Rumah ke Sekolah"
              value={formData.jarakrumah}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-[#154472] text-white p-3 rounded-md hover:bg-[#123A60]"
          >
            {isLoading ? "Mengirim..." : "Simpan"}
          </button>
        </form>
      </main>
    </div>
  );
}