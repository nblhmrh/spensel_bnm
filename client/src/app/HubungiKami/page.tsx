"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import { toast } from "sonner";
import sekolah from "@/public/sekolah.png";

export default function HubungiKami() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/hubungi-kami",
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Pesan berhasil dikirim! Terima kasih atas masukan Anda.");
        setForm({ nama: "", email: "", pesan: "" });
      } else {
        toast.error("Gagal mengirim pesan: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Gagal mengirim pesan! Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
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
            <Link href="/" className=" hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/Program" className=" hover:text-gray-300">
              Program
            </Link>{" "}
            &gt;{" "}
            <Link href="/P-kurikulum" className=" hover:text-gray-300">
              Kurikulum
            </Link>{" "}
          </p>
        </section>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl bg-white rounded-[40px] shadow-md overflow-hidden">
          <div className="relative w-full h-[500px]">
            <Image
              src={sekolah}
              alt="Sekolah"
              fill
              className="object-cover rounded-bl-[40px] rounded-tl-[40px]"
            />
          </div>
          <div className="p-6 md:p-10 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-3xl font-bold text-[#1D3557]">
                Hubungi Kami
              </h2>
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={handleChange}
                required
                className="w-full border-b border-[#1D3557] text-gray-700 focus:outline-none placeholder:text-[#434343]"
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-b border-[#1D3557] text-gray-700 focus:outline-none placeholder:text-[#434343]"
              />
              <textarea
                name="pesan"
                placeholder="Massage"
                value={form.pesan}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border-b border-[#1D3557] text-gray-700 focus:outline-none placeholder:text-[#434343] resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#1D3557] text-white px-6 py-2 rounded-full text-sm font-semibold 
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#163152]'}`}
              >
                {isSubmitting ? 'Mengirim...' : 'Hubungi Kami'}
              </button>
            </form>

            <div className="mt-8">
              <p className="font-bold text-[#1D3557]">Kontak</p>
              <a
                href="mailto:smp9.binamu@gmail.com"
                className="text-[#1D3557] underline"
              >
                smp9.binamu@gmail.com
              </a>

              <p className="font-bold text-[#1D3557] mt-4">Alamat</p>
              <p className="text-[#1D3557]">
                Empong, Kec. Binamu, Kabupaten Jeneponto, Sulawesi Selatan 92311
              </p>
            </div>
          </div>
        </div>
      </div>
      <News />
    </>
  );
}
