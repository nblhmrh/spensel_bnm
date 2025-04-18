"use client";
import React from "react";
import Navbar from "../Navbar/page";
import Link from "next/link";
import News from "@/pages/News";
import { BookCheck, ShieldCheck, Dribbble, Users } from "lucide-react";
const iconStyle = "w-10 h-10";
const programData = [
  {
    title: "Kurikulum",
    href: "/P-kurikulum",
    icon: <BookCheck className={`${iconStyle} text-[#f43f5e]`} />,
    bg: "bg-pink-100",
  },
  {
    title: "Peraturan & Tata tertib",
    href: "/P-peraturan-&-tata-tertib",
    icon: <ShieldCheck className={`${iconStyle} text-[#22c55e]`} />,
    bg: "bg-green-100",
  },
  {
    title: "Ekstrakurikuler",
    href: "/P-ekstrakurikuler",
    icon: <Dribbble className={`${iconStyle} text-[#f97316]`} />,
    bg: "bg-orange-100",
  },
  {
    title: "Parenting siswa",
    href: "/P-parenting-siswa",
    icon: <Users className={`${iconStyle} text-[#6366f1]`} />,
    bg: "bg-indigo-100",
  },
];

function Index() {
  return (
    <>
      <div className="bg-[#154472] w-full h-[300px]">
        <Navbar />
        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Program</h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link href="/Program" className="underline hover:text-gray-300">
              Program
            </Link>
          </p>
        </section>
      </div>

      <div className="px-4 md:px-16 pb-20 pt-10 text-center">
        <h1 className="text-[#154472] text-2xl md:text-3xl font-bold leading-relaxed">
          Selamat datang di layanan program sekolah kami!
          <br />
          Kami hadir untuk membantu Anda.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {programData.map((item, idx) => (
            <div key={idx} className="bg-[#f2f2f2] px-6 py-8 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className={`w-20 h-20 ${item.bg} rounded-full flex items-center justify-center`}>
                  {item.icon}
                </div>
                <Link href={item.href}>
                  <div className="bg-[#0e3e72] hover:bg-[#0a325e] text-white rounded-full text-lg px-6 py-2 font-semibold transition-all">
                    {item.title}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <News />
    </>
  );
}

export default Index;
