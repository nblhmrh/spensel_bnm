'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '@/assets/logo.png'
import gerbang from '@/assets/gerbang.png'

 function Home() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-800">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black/90">
        <Image 
          src={gerbang}
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="Logo" width={300} height={300} />
        </div>

        <h1 className="text-4xl font-bold text-white">SELAMAT DATANG !</h1>
        <div className=' inset-0 bg-blue-950 opacity-80 rounded-full relative z-10 mt-4'>
            <p className="mt-2 text-2xl text-white pb-2 relative px-8 py-2 font-semibold">Ikuti tahapan proses pendaftaran dengan teliti dan sesuai dengan data kamu ya!</p>
        </div>
        

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button 
            className="bg-[#154472] text-white px-16 py-4 rounded-lg hover:bg-gray-600 transition text-lg"
            onClick={() => router.push('/Daftar')}
          >
            Daftar
          </button>
          <button 
            className="bg-white text-gray-900 px-16 py-2 rounded-lg hover:bg-gray-600 transition text-lg"
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