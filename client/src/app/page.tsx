import React from "react";
import Navbar from "../pages/Navbar";
import Image from "next/image";
import ftskul from '../assets/ftskul.jpg'

export default function Home() {
  return (
    <div className="bg-[#154472] w-[1382px] h-[500px]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-6">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
          UPT SMP NEGERI 9 BINAMU <br /> JENEPONTO
        </h1>

        {/* Gambar */}
        <div className="mt-8 w-full md:w-2/3 lg:w-1/2">
          <Image
            src={ftskul}
            alt="Gedung Sekolah"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}
