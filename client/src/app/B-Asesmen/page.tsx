import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";

function Asesmen() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            Kurikulum
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/BK" className="underline hover:text-gray-300">
            BK
            </Link>{" "}
            &gt;{" "}
            <Link href="/B-Asesmen" className="underline hover:text-gray-300">
              Asesmen
            </Link>{" "}
            
          </p>
        </section>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-3xl text-[#154472] font-semibold">
          Asesmen BK UPT SMPN 9 Binamu
        </h1>
        <p className="text-gray-800 text-1xl font-medium py-1">
          Berikut merupakan Asesmen BK dari UPT SMPN 9 Binamu 
        </p>
      </div>

      {/* Box Link Google Drive */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-[#154472] text-white px-6 py-4 rounded-lg shadow-md w-[80%] md:w-[60%]">
          <p className="text-sm md:text-base font-semibold mb-2">
            Lihat Asesmen BK dalam link GDrive berikut:
          </p>

          {/* Link Google Drive */}
          <a
            href="https://drive.google.com/drive/folders/1z3NCLyP7npXZM9kTjI1knvHz5y-Ord8w?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-300 text-gray-700 text-sm md:text-base px-4 py-2 rounded-md text-center hover:bg-gray-400 transition"
          >
            Klik di sini untuk melihat
          </a>
        </div>
      </div>
    </>
  );
}

export default Asesmen;
