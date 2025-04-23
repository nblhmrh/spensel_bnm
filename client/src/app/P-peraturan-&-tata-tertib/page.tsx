"use client";
import React from 'react'
import Navbar from '../Navbar/page'
import Link from 'next/link'
import News from '@/pages/News';
function Tatib() {
  return (
    <>
       <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
          Peraturan & Tata Tertib
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/Program"
              className=" hover:text-gray-300"
            >
              Program
            </Link>{" "}
            &gt; {" "}
            <Link
              href="/P-peraturan-&-tata-tertib"
              className=" hover:text-gray-300"
            >
              Peraturan & Tata Tertib
            </Link>{" "}
         
          </p>
        </section>
      </div>

      <div className="px-6 pb-20 pt-10">
        <h1 className="text-[#154472]  text-2xl font-bold py-2 text-center">
        Selamat datang di halaman informasi mengenai tata tertib dan peraturan di UPT SMPN 9 Binamu ! <br/>  Kami percaya bahwa lingkungan belajar yang positif dan teratur adalah kunci keberhasilan siswa. <br/> Halaman ini berisi panduan lengkap mengenai peraturan yang berlaku di sekolah kita.
        </h1>
        </div>
        <News/>

    </>
  )
}

export default Tatib
