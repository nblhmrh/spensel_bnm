"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";

const files = [
  {
    name: "Halaman Depan",
    link: "https://docs.google.com/document/d/1Z4LQwFJPQZiQwFqSV_pJVVMRmx-VRfG3/edit?usp=sharing&ouid=110127908030158262546&rtpof=true&sd=true",
  },
  {
    name: "Kurikulum Operasional UPT SMP NEGERI 9 BINAMU",
    link: "https://docs.google.com/document/d/1syXvF6RbigMirs9EUxgQdT6VCecpgq_X/edit?usp=drive_link&ouid=110127908030158262546&rtpof=true&sd=true",
  },
];

function Kurikulum() {
  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">Kurikulum</h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className=" hover:text-gray-300">Beranda</Link>{" "}
            &gt;{" "}
            <Link href="/Program" className=" hover:text-gray-300">Program</Link>{" "}
            &gt;{" "}
            <Link href="/P-kurikulum" className=" hover:text-gray-300">Kurikulum</Link>{" "}
            
          </p>
        </section>
      </div>

      <div className="px-8 pb-8 pt-6">
        <h1 className="text-[#154472]  text-3xl font-bold py-2 text-center">
        Ingin tahu bagaimana sekolah kami mempersiapkanmu untuk masa depan?<br/> Jelajahi kurikulum lengkap kami dan temukan jawabannya
        </h1>
        </div>
      {/* Daftar File */}
      <div className="max-w-4xl mx-auto my-10 p-8 bg-[#154472] shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Download Dokumen:</h2>
        <ul className="space-y-3">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-700">{file.name}</span>
              <a
                href={file.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#154472] text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Lihat / Download
              </a>
            </li>
          ))}
        </ul>
      </div>
      <News/>
    </>
  );
}

export default Kurikulum;
