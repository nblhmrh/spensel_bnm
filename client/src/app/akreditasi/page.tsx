import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import Image from "next/image";
import akreditasi from "@/assets/akreditasi.png";
import News from "@/pages/News";

function Akreditasi() {
  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Akreditasi
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/TentangKami"
              className=" hover:text-gray-300"
            >
              Tentang Kami
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/akreditasi"
              className=" hover:text-gray-300"
            >
              Akreditasi
            </Link>{" "}
          
          </p>
        </section>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-3xl text-[#154472] font-semibold">
          Akreditasi UPT SMPN 9 Binamu
        </h1>
        <p className="text-gray-800 text-1xl font-medium py-1">
          Berikut merupakan Akreditasi dari SMPN 9 Binamu Jeneponto
        </p>
      </div>
      <div className="py-16 px-12 items-center justify-center">
        <Image
          src={akreditasi}
          alt="akreditasi"
          width={1300}
          height={1000}
          className="rounded-lg shadow-lg "
        />
      </div>
      <News />
    </>
  );
}

export default Akreditasi;
