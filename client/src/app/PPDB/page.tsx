'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '@/assets/logo.png'
import gerbang from '@/assets/gerbang.png'

function Home() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 bg-white/100">
        <Image 
          src={gerbang}
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-50 transform scale-100 hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-[#154472] px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-4 transform hover:scale-105 transition-transform duration-300">
          <Image 
            src={logo} 
            alt="Logo" 
            width={280} 
            height={280}
            className="w-44 h-46 sm:w-62 sm:h-62 md:w-75 md:h-75 lg:w-80 lg:h-80" 
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#154472] pb-4 animate-fadeIn">
          SELAMAT DATANG !
        </h1>
        
        <div className='bg-blue-950/80 backdrop-blur-sm rounded-2xl relative z-10 mt-4 transform hover:scale-105 transition-all duration-300 shadow-xl'>
          <p className="text-sm sm:text-lg md:text-1xl text-white py-3 px-4 sm:px-8 font-semibold leading-relaxed">
            Di website SPMB UPT SMPN 9 Binamu! Kami sangat senang Anda memilih sekolah kami sebagai tempat untuk meraih impian dan mengembangkan potensi diri
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 px-4">
          <button 
            className="bg-[#154472] text-white px-6 sm:px-16 py-3 sm:py-4 rounded-lg hover:bg-blue-900 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl w-full sm:w-auto"
            onClick={() => router.push('/Daftar')}
          >
            Daftar
          </button>
          <button 
            className="bg-white text-gray-900 px-8 sm:px-16 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl w-full sm:w-auto"
            onClick={() => router.push('/Login')}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;