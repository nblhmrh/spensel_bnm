"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {
  AiOutlineMail,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import skl from "@/assets/skl.jpg";
import logo from "@/assets/logo.png";
import smbt from "@/assets/smbt.png";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          password: formData.password,
          role: "user",
        }
      );

      if (response.data.user && response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
      }

      router.push("/Berandappdb");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Terjadi kesalahan");
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
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-2 sm:p-3 md:p-4 lg:p-6 rounded-2xl shadow-2xl w-[95%] sm:w-[85%] md:w-[75%] lg:w-[800px] mx-2 flex flex-col md:flex-row gap-3 transform hover:shadow-3xl transition-all duration-300">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-1 text-[#154472] animate-fadeIn">
            Tinggal selangkah lagi..
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 animate-fadeIn delay-200">
            Isilah data di bawah ini untuk melakukan pendaftaran akun terlebih dahulu ya!
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Nama */}
            <div className="relative">
              <label className="block text-gray-700 text-xs font-medium mb-1">
                Nama Lengkap
              </label>
              <div className="flex items-center border rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 hover:border-blue-400">
                <input
                  type="text"
                  name="name"
                  className="w-full focus:outline-none text-black bg-transparent"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 hover:border-blue-400">
                <AiOutlineMail className="text-gray-700 text-xl mr-2" />
                <input
                  type="email"
                  name="email"
                  className="w-full focus:outline-none text-black bg-transparent"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan email"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Nomor WhatsApp
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 hover:border-blue-400">
                <input
                  type="text"
                  name="whatsapp"
                  className="w-full focus:outline-none text-black bg-transparent"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nomor WhatsApp"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Kata Sandi
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 hover:border-blue-400">
                <RiLockPasswordLine className="text-gray-500 text-xl mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full focus:outline-none text-black bg-transparent"
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
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500 text-xl hover:text-blue-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-500 text-xl hover:text-blue-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Konfirmasi Kata Sandi
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300 hover:border-blue-400">
                <RiLockPasswordLine className="text-gray-500 text-xl mr-2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full focus:outline-none text-black bg-transparent"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan kembali kata sandi"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="focus:outline-none hover:text-blue-500 transition-colors duration-300"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500 text-xl hover:text-blue-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-500 text-xl hover:text-blue-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#154472] text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mendaftar...
                </span>
              ) : (
                "Lanjut"
              )}
            </button>
          </form>

          <p className="text-xs text-center mt-2 text-gray-600">
            Sudah memiliki akun?{" "}
            <a href="/Login" className="text-blue-600 hover:underline hover:text-blue-700 transition-colors duration-300">
              Masuk disini
            </a>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 justify-center items-center p-2 relative">
          {/* Logo di atas gambar */}
         
          <div className="relative w-full h-full max-w-[280px] transform hover:scale-105 transition-all duration-500 mt-8">
            <Image
              src={skl}
              layout="responsive"
              width={280}
              height={280}
              alt="Siswa Belajar"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Image 
              src={logo} 
              width={70} 
              height={70} 
              alt="Logo Sekolah"
              className="drop-shadow-lg transform hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
