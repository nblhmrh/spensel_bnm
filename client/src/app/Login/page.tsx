"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import logo from "@/assets/logo.png";
import skl from '@/assets/skl.jpg'
import smbt from '@/assets/smbt.png'

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/login", formData);
      // Simpan token dan user ke localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect ke halaman dashboard sesuai role
      const userRole = response.data.user?.role;
      if (userRole === "admin") {
        router.push("/BerandaAdmin");
      } else if (userRole === "bk") {
        router.push("/BerandaBK");
      } else {
        router.push("/Berandappdb");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Email atau kata sandi salah");
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden bg-gray-50">
      {/* Background Image with animation */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={smbt}
          layout="fill"
          objectFit="cover"
          alt="Background"
          className="transform scale-105 hover:scale-110 transition-transform duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md px-6 sm:px-8 md:px-12 lg:px-14 py-6 rounded-2xl shadow-2xl w-[95%] sm:w-[85%] md:w-[75%] lg:w-[800px] xl:w-[1000px] mx-4 flex flex-col md:flex-row gap-8 transform hover:shadow-3xl transition-all duration-300">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-4">
          {/* Logo Sekolah with animation */}
          <div className="flex justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
            <Image 
              src={logo} 
              width={100} 
              height={100} 
              alt="Logo Sekolah"
              className="drop-shadow-lg"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 text-[#154472] animate-fadeIn">
            Selamat Datang!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 animate-fadeIn delay-200">
            Senang melihatmu lagi! Semoga harimu penuh dengan kebahagiaan dan pengalaman menyenangkan! 🌟
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300 hover:border-blue-400">
                <AiOutlineMail className="text-gray-500 text-xl mr-2" />
                <input
                  type="email"
                  name="email"
                  className="w-full focus:outline-none text-gray-700 bg-transparent"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">Kata Sandi</label>
              <div className="flex items-center border-2 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300 hover:border-blue-400">
                <RiLockPasswordLine className="text-gray-500 text-xl mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full focus:outline-none text-gray-700 bg-transparent"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan kata sandi"
                />
                <button 
                  type="button" 
                  onClick={togglePassword} 
                  className="focus:outline-none hover:text-blue-500 transition-colors duration-300"
                >
                  {showPassword ? 
                    <AiOutlineEyeInvisible className="text-gray-500 text-xl hover:scale-110 transition-transform duration-300" /> : 
                    <AiOutlineEye className="text-gray-500 text-xl hover:scale-110 transition-transform duration-300" />
                  }
                </button>
              </div>
            </div>

            {/* Lupa Sandi */}
            <div className="text-right">
              <a 
                href="/Lupasandi" 
                className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors duration-300"
              >
                Lupa sandi?
              </a>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-[#154472] text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : "Masuk"}
            </button>
          </form>

          {/* Link ke Registrasi */}
          <p className="text-sm sm:text-base text-center mt-6 text-gray-600">
            Belum memiliki akun?{" "}
            <a 
              href="/Daftar" 
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 font-medium"
            >
              Daftar disini
            </a>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 justify-center items-center p-4">
          <div className="relative group">
            <Image 
              src={skl}
              width={380}
              height={380}
              alt="Siswa Belajar"
              className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
