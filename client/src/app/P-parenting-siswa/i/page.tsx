"use client";
import React from "react";
import Navbar from "../../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import { useState } from "react";

function Parenting() {
  const [form, setForm] = useState({
    namaLengkap: "",
    kelas: "",
    jurusan: "",
    namaOrtu: "",
    telpOrtu: "",
    emailOrtu: "",
    unitTujuan: "",
    subyekAduan: "",
    deskripsiAduan: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            Kurikulum
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/Program" className="underline hover:text-gray-300">
              Program
            </Link>{" "}
            &gt;{" "}
            <Link href="/P-kurikulum" className="underline hover:text-gray-300">
              Kurikulum
            </Link>{" "}
          </p>
        </section>
      </div>

      <div className="px-6 pb-10 pt-10 text-center">
        <h1 className="text-[#154472] text-2xl font-bold">
          Selamat Datang di Layanan Pengaduan SMPN 9 Binamu
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Kami menyediakan platform bagi siswa, orang tua, dan anggota komunitas
          sekolah lainnya untuk menyampaikan pengaduan, saran, atau masukan
          terkait berbagai aspek di lingkungan sekolah. Kami berkomitmen untuk
          menanggapi setiap laporan dengan serius dan melakukan tindakan yang
          diperlukan untuk menciptakan lingkungan belajar yang aman, nyaman, dan
          positif bagi semua. Kami menjamin kerahasiaan identitas pelapor.
          Informasi yang Anda berikan akan kami gunakan hanya untuk
          menindaklanjuti pengaduan Anda.
        </p>
      </div>

      <div className="bg-white max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-9 py-5 ">
          <input
            type="text"
            name="namaLengkap"
            placeholder="Nama Lengkap Siswa*"
            value={form.namaLengkap}
            onChange={handleChange}
            className="w-full p-3 bg-[#154472] text-white rounded-md"
            required
          />
          <input
            type="text"
            name="kelas"
            placeholder="Kelas Siswa*"
            value={form.kelas}
            onChange={handleChange}
            className="w-full p-3 bg-[#154472] text-white rounded-md"
            required
          />
          <input
            type="text"
            name="jurusan"
            placeholder="Jurusan Siswa"
            value={form.jurusan}
            onChange={handleChange}
            className="w-full p-3 bg-[#154472] text-white rounded-md"
            required
          />
          <input
            type="text"
            name="namaOrtu"
            placeholder="Nama Lengkap Orang Tua/Wali Siswa*"
            value={form.namaOrtu}
            onChange={handleChange}
            className="w-full p-3 bg-[#154472] text-white rounded-md"
            required
          />
          <div className="flex space-x-2">
            <input
              type="text"
              name="telpOrtu"
              placeholder="Nomor Telepon Orang Tua/Siswa*"
              value={form.telpOrtu}
              onChange={handleChange}
              className="w-1/2 p-3 bg-[#154472] text-white rounded-md"
              required
            />
            <input
              type="email"
              name="emailOrtu"
              placeholder="Alamat Email Orang Tua/Siswa*"
              value={form.emailOrtu}
              onChange={handleChange}
              className="w-1/2 p-3 bg-[#154472] text-white rounded-md"
              required
            />
          </div>
          <input
            type="text"
            name="unitTujuan"
            placeholder="Unit Tujuan*"
            value={form.unitTujuan}
            onChange={handleChange}
            className="w-full p-3 bg-[#154472] text-white rounded-md"
            required
          />
          <input
            type="text"
            name="subyekAduan"
            placeholder="Subyek Aduan/Masukan*"
            value={form.subyekAduan}
            onChange={handleChange}
            className="w-full p-3 bg-[#154472] text-white rounded-md"
            required
          />
          <textarea
            name="deskripsiAduan"
            placeholder="Deskripsi Aduan/Masukan*"
            value={form.deskripsiAduan}
            onChange={handleChange}
            className="w-full p-3 bg-[#154472] text-white rounded-md h-32"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-300 text-[#154472] p-3 py-8 rounded-md font-bold"
          >
            Kirim Aduan
          </button>
        </form>
      </div>
      <News/>
    </>
  );
}

export default Parenting;
