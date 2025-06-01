"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import {
    FaSignOutAlt,
    FaHome,
    FaUserPlus,
    FaBullhorn,
    FaQuestionCircle,
  } from "react-icons/fa"
import logo from '@/assets/logo.png'
import axios from "axios";

export default function FormOrangTua() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    nama_ayah: "",
    kontak_ayah: "",
    pekerjaan_ayah: "",
    penghasilan_ayah: "",
    alamat_ayah: "",
    nama_ibu: "",
    kontak_ibu: "",
    pekerjaan_ibu: "",
    penghasilan_ibu: "",
    alamat_ibu: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/dataortu", formData);
      alert("Data berhasil dikirim!");
      console.log(response.data);
    } catch (error) {
      console.error("Error mengirim data:", error);
      alert("Gagal mengirim data.");
    }
  };

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

  return (
    <div className="flex">
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
             className="flex items-center text-left w-full px-4 py-2 rounded-lg ">
              <FaHome className="mr-2" /> Beranda
            </button>
            <button
              onClick={() => router.push("/Pendaftaran")}
              className="flex items-center text-left w-full px-4 py-2 bg-blue-100 font-semibold text-blue-800 hover:bg-gray-200 rounded-lg"
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
        <h1 className="text-2xl font-bold text-[#154472]">Isi Data Orang Tua / Wali</h1>

        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-lg text-gray-700">
          {/* Data Ayah */}
          <h2 className="font-bold text-lg">Data Ayah</h2>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Nama Ayah</label>
            <input type="text" name="nama_ayah" value={formData.nama_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">No. Kontak/WhatsApp Ayah</label>
            <input type="text" name="kontak_ayah" value={formData.kontak_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Pekerjaan Ayah</label>
            <input type="text" name="pekerjaan_ayah" value={formData.pekerjaan_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Penghasilan Ayah (Rp/Bulan)</label>
            <input type="text" name="penghasilan_ayah" value={formData.penghasilan_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Alamat Ayah</label>
            <input type="text" name="alamat_ayah" value={formData.alamat_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          {/* Data Ibu */}
          <h2 className="mt-6 font-bold text-lg">Data Ibu</h2>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Nama Ibu</label>
            <input type="text" name="nama_ibu" value={formData.nama_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">No. Kontak/WhatsApp Ibu</label>
            <input type="text" name="kontak_ibu" value={formData.kontak_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Pekerjaan Ibu</label>
            <input type="text" name="pekerjaan_ibu" value={formData.pekerjaan_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Penghasilan Ibu (Rp/Bulan)</label>
            <input type="text" name="penghasilan_ibu" value={formData.penghasilan_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Alamat Ibu</label>
            <input type="text" name="alamat_ibu" value={formData.alamat_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <button type="submit" className="mt-6 w-full bg-[#154472] text-white p-3 rounded-md hover:bg-[#123A60]">Simpan</button>
        </form>
      </main>
    </div>
  );
}
