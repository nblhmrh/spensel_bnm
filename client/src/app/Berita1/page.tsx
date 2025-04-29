"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/page';
import Link from 'next/link';
import News from '@/pages/News';
import API from '@/utils/api';

interface Berita {
  id: number;
  judul: string;
  konten: string;
  thumbnail: string;
  foto: string;
  slug: string;
}

function Berita1() {
  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await API.get('/berita');
        console.log('Semua data berita:', response.data); // Log untuk debugging
        
        // Coba beberapa cara pencarian yang berbeda
        let berita1Data = response.data.find((item: Berita) => item.slug === 'berita1');
        
        // Jika tidak ditemukan, coba dengan includes
        if (!berita1Data) {
          berita1Data = response.data.find((item: Berita) => 
            item.slug.includes('berita1') || 
            item.slug.includes('Berita1')
          );
        }
        
        // Jika masih tidak ditemukan, ambil data pertama (jika ada)
        if (!berita1Data && response.data.length > 0) {
          berita1Data = response.data[0];
          console.log('Menggunakan data pertama sebagai fallback:', berita1Data);
        }
        
        console.log('Data berita1 yang ditemukan:', berita1Data); // Log untuk debugging
        setBerita(berita1Data || null);
      } catch (error) {
        console.error('Error fetching berita:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            {loading ? 'Memuat...' : berita?.judul || 'Berita 1'}
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/Berita" className="hover:text-gray-300">
              Berita
            </Link>{" "}
            &gt;{" "}
            <Link href="/Berita1" className="hover:text-gray-300">
              Berita 1
            </Link>
          </p>
        </section>
      </div>

      <div className="container mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#154472]"></div>
          </div>
        ) : berita ? (
          <div className="max-w-4xl mx-auto">
            {berita.foto && (
             <img
             src={`http://localhost:8000/storage/${berita.foto}`}
             alt={berita.judul}
             className="w-full h-[400px] object-cover rounded-lg mb-8"
             onError={(e) => {
               const target = e.target as HTMLImageElement;
               console.error('Error loading image:', target.src);
               target.onerror = null;
               target.style.display = 'none';
             }}
           />
            )}
            <h2 className="text-3xl font-bold text-[#154472] mb-4">{berita.judul}</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{berita.konten}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>Berita tidak ditemukan</p>
            <p className="mt-4">Silakan periksa apakah data berita sudah ditambahkan dengan benar di panel admin.</p>
          </div>
        )}
      </div>
      <News />
    </>
  );
}

export default Berita1;
