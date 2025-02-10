"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaCalendarAlt, FaWhatsapp, FaIdCard } from "react-icons/fa";
import logo from "@/assets/logo.png";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl flex">
        {/* Form Section */}
        <div className="w-1/2 p-4">
          <Image
            src={logo}
            alt="School Logo"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h2 className="text-center text-xl font-bold text-blue-600">
            Tinggal selangkah lagi..
          </h2>
          <p className="text-sm text-center mb-4">
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
                className="pl-10 p-2 w-full border rounded-lg"
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
                className="pl-10 p-2 w-full border rounded-lg"
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
                className="pl-10 p-2 w-full border rounded-lg"
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
                className="pl-10 p-2 w-full border rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Lanjut
            </button>
          </form>
        </div>
        {/* Image Section */}
        <div className="w-1/2 flex justify-center items-center p-4">
          <Image
            src="/images/students.jpg"
            alt="Illustration"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
