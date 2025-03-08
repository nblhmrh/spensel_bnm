"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaCalendarAlt, FaWhatsapp, FaIdCard } from "react-icons/fa";
import logo from "@/assets/logo.png";
import skl from '@/assets/skl.jpg'
import smbt from '@/assets/smbt.png'

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    whatsapp: "",
    nik: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Data dikirim:", formData);
    router.push("/next-page"); // Ganti dengan halaman tujuan
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={smbt}
          layout="fill"
          objectFit="cover"
          alt="Background"
          quality={100}
        />
      </div>

    <div className="flex items-center justify-center min-h-screen bg-transparent z-10">
      <div className="relative z-10 bg-white px-14 py-3.5 rounded-lg shadow-lg w-[1200px] flex">
        {/* Form Section */}
        <div className="w-1/2 p-4">
          <Image
            src={logo}
            alt="School Logo"
            width={100}
            height={100}
            className="flex justify-center mb-4 mx-auto"
          />
          <h2 className="text-2xl font-semibold text-center mb-2 text-[#154472]">
            Tinggal selangkah lagi..
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Isilah data-data di bawah ini untuk melakukan pendaftaran akun
            terlebih dahulu ya!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Nama lengkap calon siswa/i"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10 p-2 w-full border rounded-lg text-black"
              />
            </div>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="pl-10 p-2 w-full border rounded-lg text-black"
              />
            </div>
            <div className="relative">
              <FaWhatsapp className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="whatsapp"
                placeholder="Nomor WhatsApp calon siswa/i"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="pl-10 p-2 w-full border rounded-lg text-black"
              />
            </div>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="nik"
                placeholder="NIK calon siswa/i"
                value={formData.nik}
                onChange={handleChange}
                required
                className="pl-10 p-2 w-full border rounded-lg text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#154472] text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Lanjut
            </button>
          </form>
        </div>
        {/* Image Section */}
        <div className="w-1/2 flex justify-center items-center p-4">
          <Image
            src={skl}
            alt="Illustration"
            width={380}
            height={380}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
    </div>
  );
}
