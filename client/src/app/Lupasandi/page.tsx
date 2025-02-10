"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Select, { SingleValue } from "react-select";
import axios from "axios";
import logo from "@/assets/logo.png";

// Data kode negara
const countryOptions = [
  { value: "+62", label: "🇮🇩 Indonesia (+62)" },
  { value: "+1", label: "🇺🇸 Amerika (+1)" },
  { value: "+44", label: "🇬🇧 Inggris (+44)" },
  { value: "+91", label: "🇮🇳 India (+91)" },
  { value: "+81", label: "🇯🇵 Jepang (+81)" },
];

export default function LupaSandi() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+62"); // Default Indonesia
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleCountryChange = (newValue: SingleValue<{ value: string; label: string }>) => {
      if (newValue) {
        setCountryCode(newValue.value);
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!phone.match(/^\d{12,13}$/)) {
      setError("Nomor WhatsApp harus 12-13 digit angka.");
      setLoading(false);
      return;
    }

    try {
      // 🔹 Kirim nomor WhatsApp ke backend untuk proses reset
      const response = await axios.post("http://localhost:8000/api/lupa-sandi", { phone: `${countryCode}${phone}` });

      console.log(response.data);
      alert("Kode OTP telah dikirim ke WhatsApp Anda!");

      // 🔹 Redirect ke halaman verifikasi OTP
      router.push(`/verifikasi-otp?phone=${countryCode}${phone}`);
    } catch (err) {
      console.error(err);
      setError("Gagal mengirim kode OTP. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white px-14 py-10 rounded-lg shadow-lg w-[700px] text-center">
        {/* Logo Sekolah */}
        <div className="flex justify-center mb-4">
          <Image src={logo} width={100} height={100} alt="Logo Sekolah" />
        </div>

        <h2 className="text-2xl font-semibold text-[#154472]">Lupa Kata Sandi?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Masukkan nomor WhatsApp yang terdaftar pada akun UPT SMPN 9 BINAMU
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Form Nomor WhatsApp */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center border rounded-lg px-3 py-2 text-gray-500 bg-gray-100">
            {/* Dropdown Pilihan Negara */}
            <Select
              options={countryOptions}
              defaultValue={countryOptions[0]}
              onChange={handleCountryChange}
              className="w-40 mr-2"
            />
            {/* Input Nomor Telepon */}
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={13}
              placeholder="Masukkan nomor WhatsApp"
              className="w-full focus:outline-none bg-transparent text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#154472] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
