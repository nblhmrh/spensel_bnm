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

      // Jika backend mengembalikan user & token, simpan ke localStorage
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
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={smbt} layout="fill" objectFit="cover" alt="Background" />
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-white px-14 rounded-lg shadow-lg w-[1200px] flex">
        {/* Form Kiri */}
        <div className="w-1/2 p-4">
          {/* Logo Sekolah */}
          <div className="flex justify-center mb-4">
            <Image src={logo} width={100} height={100} alt="Logo Sekolah" />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-2 text-[#154472]">
            Tinggal selangkah lagi..
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Isilah data di bawah ini untuk melakukan pendaftaran akun terlebih
            dahulu ya!
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Nama Lengkap
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  name="name"
                  className="w-full focus:outline-none text-black"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <AiOutlineMail className="text-gray-700 text-xl mr-2" />
                <input
                  type="email"
                  name="email"
                  className="w-full focus:outline-none text-black"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan email"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Nomor WhatsApp
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  name="whatsapp"
                  className="w-full focus:outline-none text-black"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nomor WhatsApp"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Kata Sandi
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <RiLockPasswordLine className="text-gray-500 text-xl mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full focus:outline-none text-black"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500 text-xl" />
                  ) : (
                    <AiOutlineEye className="text-gray-500 text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Konfirmasi Kata Sandi
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <RiLockPasswordLine className="text-gray-500 text-xl mr-2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full focus:outline-none text-black"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan kembali kata sandi"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500 text-xl" />
                  ) : (
                    <AiOutlineEye className="text-gray-500 text-xl" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#154472] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Lanjut"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Sudah memiliki akun?{" "}
            <a href="/Login" className="text-blue-600 hover:underline">
              Masuk disini
            </a>
          </p>
        </div>

        {/* Gambar Samping */}
        <div className="w-1/2 flex justify-center items-center">
          <Image
            src={skl}
            width={380}
            height={380}
            alt="Siswa Belajar"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
