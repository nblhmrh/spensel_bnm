import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
import visi from "@/assets/visi.png"; // Gambar untuk bagian visi
import misi from "@/assets/misi.png"; // Gambar untuk bagian misi
import News from "@/pages/News";
export default function VisiMisi() {
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Visi & Misi
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/TentangKami" className=" hover:text-gray-300">
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link href="/visi-misi" className=" hover:text-gray-300">
              Visi & Misi
            </Link>
          </p>
        </section>
      </div>

      {/* Visi & Misi Section */}
      <section className="px-6 py-8 max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#154472] mb-8">
          Visi & Misi SMPN 9 Binamu Jeneponto
        </h1>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Visi Section */}
          <div className="bg-gray-200 p-8 rounded-lg py-6">
            <h2 className="text-lg md:text-xl font-bold text-[#154472] mb-2">
              Visi Kami
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque gravida ultricies sapien sed mattis. Cras mattis
              venenatis facilisis. Aliquam erat volutpat. Nunc suscipit gravida
              nibh eu mollis. Nullam laoreet ante ac ligula commodo.
            </p>
          </div>
          {/* Gambar Visi */}
          <div className="relative">
            <Image
              src={misi}
              alt="Visi Sekolah"
              className="pt-20 w-full h-auto rounded-lg shadow-lg object-cover"
              style={{
                clipPath:
                  "polygon(10% 0%, 100% 0%, 100% 85%, 80% 100%, 0% 100%, 0% 10%)",
              }}
            />
          </div>

          {/* Gambar Misi */}
          <div className="relative order-2 md:order-1">
            <Image
              src={visi}
              alt="Misi Sekolah"
              className="w-full pb-16 h-auto rounded-lg shadow-lg object-cover"
              style={{
                clipPath:
                  "polygon(0% 0%, 85% 0%, 100% 10%, 100% 100%, 10% 100%, 0% 85%)",
              }}
            />
          </div>

          {/* Misi Section */}
          <div className="bg-gray-200 p-6 rounded-lg order-1 md:order-2">
            <h2 className="text-lg md:text-xl font-bold text-[#154472] mb-2">
              Misi Kami
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque gravida ultricies sapien sed mattis. Cras mattis
              venenatis facilisis. Aliquam erat volutpat. Nunc suscipit gravida
              nibh eu mollis. Nullam laoreet ante ac ligula commodo.
            </p>
          </div>
        </div>
      </section>
      <News />
    </>
  );
}
