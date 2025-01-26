import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";

function Card() {
  return (
    <>
      <div className="bg-[#ffffff] w-[1382px] h-[300px] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-black text-center mb-4 ">
          AYO GABUNG BERSAMA KAMI!
        </h1>
        <h1 className="text-3xl font-bold text-[#154472] text-center mb-6">
          Raih masa depanmu bersama kami
        </h1>

        <button className="bg-yellow-400 text-black font-medium px-6 py-2 rounded-md shadow-md hover:bg-yellow-500">
          Daftar Sekarang!
        </button>
      </div>

      <div className="bg-[#154472] w-full; h-[300px]">
        <div className="px-10 py-12">
          {" "}
          <Image src={logo} alt="Logo Sekolah" width={200} height={200} />
        </div>

        <section className="flex flex-col space-x-7">
          <p className="font-semibold text-white">
            Copyright © 2025 SMPN 9 Binamu All rights reserved.
          </p>
        </section>
      </div>
    </>
  );
}

export default Card;
