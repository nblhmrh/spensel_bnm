"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/page';
import Link from 'next/link';
import News from '@/pages/News';
import { motion } from 'framer-motion';
import API from '@/utils/api';

interface ProfilBK {
  visi: string;
  misi: string;
  intro_text: string;
  teacher_name: string;
  teacher_birth: string;
  teacher_education: string;
  teacher_instagram: string;
  teacher_photo: string;
}

export default function BProfil() {
  const [profilBK, setProfilBK] = useState<ProfilBK | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfilBK();
  }, []);

  const fetchProfilBK = async () => {
    try {
      const response = await API.get('/profil-bk');
      if (response.data) {
        setProfilBK(response.data);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching profil BK:', error);
      setError('Gagal memuat data profil BK');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#154472] mx-auto"></div>
          <p className="mt-4 text-[#154472]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={fetchProfilBK}
            className="mt-4 px-4 py-2 bg-[#154472] text-white rounded hover:bg-[#1a5a99] transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!profilBK) return null;

  const misiArray = profilBK.misi.split('\n').filter(item => item.trim() !== '');

  return (
    <>
      <motion.div 
        className="bg-[#154472] w-full h-[300px] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <motion.section 
          className="flex flex-col py-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Profil BK
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/BK" className="hover:text-gray-300 transition-colors duration-300">
              BK
            </Link>{" "}
            &gt;{" "}
            <Link href="/B-Profil" className="hover:text-gray-300 transition-colors duration-300">
              Profil BK
            </Link>
          </p>
        </motion.section>
      </motion.div>

      {/* Wave SVG Top */}
      <div className="relative w-full overflow-hidden -mt-1">
        <motion.svg
          viewBox="0 70 1440 120"
          className="w-full h-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.path
            fill="#154472"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            animate={{
              d: [
                "M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,112C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          className="text-gray-800 text-lg leading-relaxed text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p>{profilBK.intro_text}</p>
        </motion.div>
        
        <motion.div 
          className="bg-[#154472] p-6 rounded-lg shadow-md text-center text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-6">Guru BK SMPN 9 Binamu</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${profilBK.teacher_photo}`}
              alt="Foto Guru BK"
              className="w-48 h-48 mx-auto rounded-full object-cover mb-4"
            />
          </motion.div>
          <p className="font-medium">Nama: {profilBK.teacher_name}</p>
          <p>TTL: {profilBK.teacher_birth}</p>
          <p>Pendidikan: {profilBK.teacher_education}</p>
          <motion.p 
            className="mt-2 text-white underline hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
          >
            <a href={profilBK.teacher_instagram} target="_blank" rel="noopener noreferrer">
              Instagram: @{profilBK.teacher_instagram.split('@').pop()}
            </a>
          </motion.p>
        </motion.div>
      </div>

      <motion.div 
        className="bg-white text-center py-12 px-6 my-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold bg-[#154472] text-white py-4 px-6 rounded-t-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            VISI MISI BK
          </motion.h2>

          <div className="p-6">
            <motion.div 
              className="mb-8 transform hover:scale-105 transition-transform duration-300"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-[#154472] mb-4 flex items-center">
                <motion.span
                  className="inline-block mr-3 text-3xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.span>
                VISI
              </h3>
              <motion.div 
                className="bg-gray-50 p-6 rounded-xl shadow-inner"
                whileHover={{ boxShadow: "0 8px 20px rgba(21, 68, 114, 0.2)" }}
              >
                <p className="text-[#154472] text-lg font-medium italic">
                  {profilBK.visi}
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-[#154472] mb-4 flex items-center">
                <motion.span
                  className="inline-block mr-3 text-3xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.span>
                MISI
              </h3>
              <div className="space-y-4">
                {misiArray.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 p-4 rounded-xl shadow-sm flex items-center gap-4 transform hover:translate-x-2 transition-transform duration-300"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 4px 12px rgba(21, 68, 114, 0.15)"
                    }}
                  >
                    <span className="bg-[#154472] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-[#154472] text-lg font-medium flex-1">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Wave SVG Bottom */}
      <div className="relative w-full overflow-hidden">
        <motion.svg
          viewBox="0 0 1440 230"
          className="w-full h-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.path
            fill="#154472"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,112C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>

      <News />
    </>
  );
}