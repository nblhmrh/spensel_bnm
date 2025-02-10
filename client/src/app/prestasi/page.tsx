"use client";

import "../style.css"
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import News from "@/pages/News";
import lynan1 from "@/assets/lynan1.png";
import lynan2 from "@/assets/lynan2.png";
import lynan3 from "@/assets/lynan3.png";
import lynan4 from "@/assets/lynan4.png";
import lynan5 from "@/assets/lynan5.png";
import klasik1 from "@/assets/klasik1.png";
import klasik2 from "@/assets/klasik2.png";
import klasik3 from "@/assets/klasik3.png";
import konseling from "@/assets/konseling.png";
import videdu from "@/assets/videdu.png";

const prestasiData = [
  { id: 1, image: lynan1, link: "/Prestasi1" },
  { id: 2, image: lynan2, link: "/Prestasi2" },
  { id: 3, image: lynan3, link: "/Prestasi3" },
  { id: 4, image: lynan4, link: "/Prestasi4" },
  { id: 5, image: lynan5, link: "/Prestasi5" },
  { id: 6, image: klasik1, link: "/Prestasi6" },
  { id: 7, image: klasik2, link: "/Prestasi7" },
  { id: 8, image: klasik3, link: "/Prestasi8" },
  { id: 9, image: konseling, link: "/Prestasi9" },
  { id: 10, image: videdu, link: "/Prestasi10" },
];

function Prestasi() {
  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Prestasi</h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className="underline hover:text-gray-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link href="/prestasi" className="underline hover:text-gray-300">
              Prestasi
            </Link>
          </p>
        </section>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-3xl text-[#154472] font-semibold">
        Prestasi UPT SMPN 9 Binamu 
        </h1>
        <p className="text-gray-800 text-xl font-medium py-1 text-center">
        Halaman Prestasi ini adalah cerminan kualitas pendidikan dan dedikasi tinggi dari seluruh warga sekolah. Setiap prestasi adalah bukti komitmen kami untuk memberikan yang terbaik bagi perkembangan dan kemajuan siswa.
        </p>
      </div>

      <div className="pl-28 pb-14 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          className="relative"
        >
          {prestasiData.map((prestasi) => (
            <SwiperSlide key={prestasi.id} className="flex justify-center">
              <Link href={prestasi.link} className="block w-full max-w-xs">
                <Image
                  src={prestasi.image}
                  alt={`Prestasi ${prestasi.id}`}
                  width={300}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-xl shadow-lg hover:scale-100 transition-transform duration-300"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <News/>
    </>
  );
}

export default Prestasi;
