"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaCalendarAlt, FaWhatsapp, FaIdCard } from "react-icons/fa";
import axios from "axios"; // Import Axios
import logo from "@/assets/logo.png";
import skl from '@/assets/skl.jpg';
import smbt from '@/assets/smbt.png';

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    whatsapp: "",
    nik: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Format data sesuai kebutuhan backend
      const payload = {
        full_name: formData.name,  // Pastikan nama field match
        birth_date: new Date(formData.birthDate).toISOString().split('T')[0], // Format YYYY-MM-DD
        nik: formData.nik.toString().padStart(16, '0'), // Pastikan 16 digit
        whatsapp_number: formData.whatsapp.toString().replace(/\D/g, '') // Hanya angka
      };
  
      const response = await axios.post(
        "http://localhost:8000/api/daftar2",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
  
      if (response.status === 201) {
        // Ambil data user lama dari localStorage
        const userStr = localStorage.getItem("user");
        let userObj = {};
        if (userStr) {
          try {
            userObj = JSON.parse(userStr);
          } catch {
            userObj = {};
          }
        }

        // Update data user dengan nama & whatsapp dari response (atau form)
        const updatedUser = {
          ...userObj,
          name: response.data.full_name || formData.name,
          whatsapp: response.data.whatsapp_number || formData.whatsapp,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Tidak perlu login ulang!
        router.push("/Berandappdb");
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        // Tampilkan error validasi spesifik
        const errors = error.response.data.errors;
        let errorMessage = "Validasi Error:\n";
        
        for (const [field, messages] of Object.entries(errors)) {
          errorMessage += `${field}: ${messages.join(', ')}\n`;
        }
        
        alert(errorMessage);
      } else {
        alert("Error: " + (error.response?.data.message || error.message));
      }
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading} // Nonaktifkan tombol saat loading
              >
                {isLoading ? "Mengirim..." : "Lanjut"}
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