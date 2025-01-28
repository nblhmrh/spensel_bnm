import React from "react";
import Navbar from "../pages/Navbar";
import Link from "next/link";
import Image from "next/image";
import struktur from "../assets/struktur.png";
import News from "../pages/news";

function StrukturOrganisasi() {
  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Struktur Organisasi
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/tentang-kami"
              className="underline hover:text-gray-300"
            >
              Tentang Kami
            </Link>{" "}
            &gt; <span className="text-gray-300 ">Struktur Organisasi</span>
          </p>
        </section>
      </div>
      <div>
        <h1 className="text-3xl text-[#154472] font-semibold px-6 py-8">
          Struktur Organisasi UPT SMPN 9 Binamu
        </h1>
      </div>
      <div className="py-16 px-12 items-center justify-center">
        <Image
          src={struktur}
          alt="struktur"
          width={1300}
          height={1000}
          className="rounded-lg shadow-lg "
        />
      </div>
      <News/>
    </>
  );
}

export default StrukturOrganisasi;
