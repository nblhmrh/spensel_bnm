import React from "react";
import Navbar from "../pages/Navbar";
import Link from "next/link";
import ftskul from "../assets/ftskul.jpg";
import Image from "next/image";

import {
  FaBuilding,
  FaChalkboardTeacher,
  FaLeaf,
  FaHandshake,
} from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Visi & Misi
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
            &gt; <span className="text-gray-300 ">Visi & Misi</span>
          </p>
        </section>
      </div>
      
      <section className="px-6  py-8">
        <h1 className="text-3xl font-bold text-[#154472]">
          Visi & Misi SMPN 9 Binamu Jeneponto
        </h1>
        
        <div className="text-[#5F5F5F] leading-relaxed w-full md:w-2/3">
          <h2 className="text-lg md:text-xl font-bold text-[#154472] py-4">
            Visi
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, odit inventore. Impedit, dolore quibusdam sunt exercitationem repudiandae corporis recusandae voluptatum optio obcaecati ducimus assumenda, amet id eaque quisquam sint in minima excepturi veritatis! Impedit rem provident ullam autem eaque nobis, harum a aut officia, rerum libero tenetur, odit natus incidunt necessitatibus illo corporis sed quas quos nihil consequuntur. Aliquam suscipit natus vero hic quibusdam quia ut earum, odit ullam quos magnam repellat, fugit voluptas. Itaque animi minus aliquid sapiente repellendus, accusantium voluptate reprehenderit possimus vel! Porro cumque modi nam nesciunt recusandae. Aut ab itaque numquam odio quia maiores libero sint.
          </p>
        </div>
        <div className="text-[#5F5F5F] leading-relaxed w-full md:w-2/3">
          <h2 className="text-lg md:text-xl font-bold text-[#154472] py-4">
            Visi
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque gravida ultricies sapien sed mattis. Cras mattis
            venenatis facilisis. Aliquam erat volutpat. Nunc suscipit gravida
            nibh eu \mollis. Nullam laoreet ante acligula commodo,
          </p>
        </div>

        <div className="w-full md:w-1/3 flex mb-8 md:mb-0">
          <Image
            src={ftskul}
            alt="Gedung Sekolah"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </>
  );
}
