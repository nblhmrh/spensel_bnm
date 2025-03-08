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
      console.log(response.data);

      // 🔹 Redirect ke halaman dashboard setelah login
      router.push("/Berandappdb");
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
    <>
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={smbt}
          layout="fill"
          objectFit="cover"
          alt="Background"
        />
      </div>
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Form Container */}
      <div className="bg-white px-14 py-4 rounded-lg shadow-lg w-[1200px] flex">
        {/* Form Kiri */}
        <div className="w-1/2 p-4">
          {/* Logo Sekolah */}
          <div className="flex justify-center mb-4">
            <Image src={logo} width={100} height={100} alt="Logo Sekolah" />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-2 text-[#154472]">Selamat Datang!</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Senang melihatmu lagi! Semoga harimu penuh dengan kebahagiaan dan pengalaman menyenangkan! 🌟
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <AiOutlineMail className="text-gray-500 text-xl mr-2" />
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

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-medium mb-1">Kata Sandi</label>
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
                <button type="button" onClick={togglePassword} className="focus:outline-none">
                  {showPassword ? <AiOutlineEyeInvisible className="text-gray-500 text-xl" /> : <AiOutlineEye className="text-gray-500 text-xl" />}
                </button>
              </div>
            </div>

            {/* Lupa Sandi */}
            <div className="text-right mb-4">
              <a href="/Lupasandi" className="text-blue-600 text-sm hover:underline">
                lupa sandi?
              </a>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-[#154472] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Link ke Registrasi */}
          <p className="text-sm text-center mt-4 text-gray-600">
            belum memiliki akun?{" "}
            <a href="/Daftar" className="text-blue-600 hover:underline">
              Daftar disini
            </a>
          </p>
        </div>

        {/* Placeholder Gambar */}
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
    </div>
    </>
  );
}
