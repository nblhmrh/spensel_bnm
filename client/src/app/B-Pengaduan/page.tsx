"use client";

import React, { useState } from 'react';
import Navbar from '../Navbar/page';
import Link from 'next/link';
import News from '@/pages/News';
function LayPengaduan() {
  const [formData, setFormData] = useState({
    name: '',
    kelas: '',
    email: '',
    pesan: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data yang dikirim:', formData);
    alert('Pengaduan berhasil dikirim!');
    setFormData({ name: '', kelas: '', email: '', pesan: '' });
  };

  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Layanan Pengaduan Siswa
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/BK" className="underline hover:text-gray-300">
              BK
            </Link>{" "}
            &gt;{" "}
            <Link href="/B-Pengaduan" className="underline hover:text-gray-300">
              Pengaduan
            </Link>{" "}
          </p>
        </section>
      </div>
      
      <div className="text-center bg-white p-6 mt-6 text-[#154472]">
        <p className="text-lg font-medium">
          Selamat datang di layanan pengaduan BK SMPN 9 Binamu, Kami hadir untuk mendengarkan dan membantu siswa mengatasi berbagai permasalahan yang dihadapi. Setiap siswa memiliki hak untuk didengar dan mendapatkan dukungan. Melalui layanan pengaduan ini, kami membuka pintu bagi siswa untuk menyampaikan keluhan, saran, atau masukan demi kebaikan bersama. Jangan ragu untuk berbicara! Layanan pengaduan BK ini menjadi tempat yang aman dan nyaman bagi siswa untuk berbagi cerita dan mencari solusi.
        </p>
      </div>

      <div className='pb-8'>
      <div className="bg-[#154472] p-6 max-w-3xl mx-auto rounded-lg shadow-md pb-12 mt-6 text-white">
        <h2 className="text-center text-xl font-bold mb-4">
          Silahkan mengisi di bawah ini
        </h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg text-black">
          <div className="grid grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              placeholder="Kelas"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <textarea
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            placeholder="Pesan"
            className="w-full border border-gray-300 p-2 rounded h-32 mb-3"
            required
          ></textarea>
          <p className="text-sm text-left text-gray-400 mb-2">
            NB* Anda tidak perlu login untuk mengisi kritik dan saran
          </p>
          <button
            type="submit"
            className="z-10 mt-6 px-8 py-3 border-2 border-[#154472] text-[#154472] text-lg font-semibold rounded-full hover:bg-[#154472] hover:text-white transition"
          >
            Kirim
          </button>
        </form>
      </div>
      </div>
      <News/>
    </>
  );
}

export default LayPengaduan;