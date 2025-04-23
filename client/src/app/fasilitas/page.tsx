"use client";
import React, { useState } from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import Image from "next/image";
// import smbt from "@/assets/smbt.png";
import type { StaticImageData } from "next/image";
import klasik1 from "@/assets/klasik1.png";
import klasik2 from "@/assets/klasik2.png";
import klasik3 from "@/assets/klasik3.png";
import ftskul from "@/assets/ftskul.jpg";

const fasilitasData = [
  {
    title: "Lobby Utama",
    description: "Ruang tunggu tamu",
    image: klasik1,
  },
  {
    title: "Kelas Milenial",
    description: "Kelas Smart",
    image: klasik2,
  },
  {
    title: "Lapangan",
    description: "Lapangan Serbaguna",
    image: klasik3,
  },
  {
    title: "Kelas Milenial 2",
    description: "TV, Meja, AC dan CCTV",
    image: ftskul,
  },
  // {
  //   title: "Perpustakaan",
  //   description: "Menyediakan sumber belajar berupa buku dan majalah",
  //   image: smbt,
  // },
  // {
  //   title: "Perpustakaan",
  //   description: "Menyediakan sumber belajar berupa buku dan majalah",
  //   image: smbt,
  // },
];

function Fasilitas() {
  const [selectedImage, setSelectedImage] = useState<{ title: string; description: string; image: StaticImageData } | null>(null);

  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">Fasilitas</h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300"> Beranda </Link> &gt;
            <Link href="/TentangKami" className=" hover:text-gray-300"> Tentang Kami </Link> &gt;
            <Link href="/fasilitas" className=" hover:text-gray-300"> Fasilitas </Link>
          </p>
        </section>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-3xl text-[#154472] font-semibold">Fasilitas UPT SMPN 9 Binamu</h1>
        <p className="text-gray-800 text-lg font-medium py-1">
          Berikut merupakan Fasilitas dari  UPT SMPN 9 Binamu.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {fasilitasData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 cursor-pointer" onClick={() => setSelectedImage(item)}>
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
                <button
                  className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-75"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(item);
                  }}
                >
                  +
                </button>
              </div>
              <h2 className="mt-2 text-gray-700 font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <News />

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl">
            <Image src={selectedImage.image} alt={selectedImage.title} width={800} height={600} className="rounded-lg" />
            <h2 className="mt-4 text-xl font-bold text-center">{selectedImage.title}</h2>
            <p className="text-gray-600 text-center">{selectedImage.description}</p>
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-800"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Fasilitas;
