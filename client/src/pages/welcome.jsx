import React from "react";
import Navbar from "@/app/Navbar/page";
import Image from "next/image";
import laskar from "../assets/laskar.jpg";
import smbt from '../assets/smbt.png'
import News from "@/pages/News";
import ayah from '../assets/ayah.png'
import {
  FaBuilding,
  FaChalkboardTeacher,
  FaLeaf,
  FaHandshake,
} from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: FaBuilding,
      title: "Fasilitas Lengkap",
      desc: "Dukungan belajar terbaik dengan kualitas premium.",
    },
    {
      icon: FaChalkboardTeacher,
      title: "Pengajar Kompeten",
      desc: "Guru yang relevan dengan kebutuhan zaman.",
    },
    {
      icon: FaLeaf,
      title: "Lingkungan Nyaman",
      desc: "Menempati lingkungan yang ramah, tenang, dan ideal.",
    },
    {
      icon: FaHandshake,
      title: "Kerjasama Luas",
      desc: "Mengembangkan peluang profesional selama masa studi.",
    },
  ];
  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[500px]">
        <Navbar />
        
        <section className="flex flex-col items-center text-center py-16 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ffff]">
            UPT SMP NEGERI 9 BINAMU <br /> JENEPONTO
          </h1>
          <div className="mt-8 w-full md:w-2/3 lg:w-1/2 ">
            <Image
              src={laskar}
              alt="Gedung Sekolah"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
        </div>
        <div>
        
          {/* Section: Kenapa Harus SMP Negeri 9 Binamu */}
          <section className="text-center pt-52 px-6">
            <h1 className="text-3xl font-bold text-blue-900">
              Kenapa Harus SMP Negeri 9 Binamu?
            </h1>
            <p className="text-gray-600 mt-3">
              Alasan kenapa kalian harus memilih untuk bergabung dengan SMPN 9
              Binamu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="text-blue-900 text-5xl mb-4">
                      <Icon />
                    </div>
                    <h3 className="font-semibold text-lg text-blue-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
          </div>
          {/* Section: Sambutan Kepala Sekolah */}
          <section className="relative py-12 px-6 top-14 flex flex-col md:flex-row items-center">
            {/* Background Gambar */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={smbt}
                alt="Sekolah"
                layout="fill"
                objectFit="cover"
                quality={90}
              />
              <div className="absolute inset-0 bg-gray-100/60 backdrop-blur-md"></div>
            </div>
            {/* Konten */}
            <div className="relative top-12 z-10 w-full h-[500px] md:w-1/3 flex justify-center">
              <Image
                src={ayah}
                alt="Kepala Sekolah"
                width={600}
                height={800}
                className="rounded-lg"
              />
            </div>
            <div className="relative pt-10 z-10 w-full md:w-2/3 mt-6 md:mt-0 md:ml-8 text-white">
              <h2 className="text-xl font-bold text-blue-900">
                SAMBUTAN KEPALA SEKOLAH
              </h2>
              <div className="text-gray-800 py-3">
                <p>Assalamualaikum warahmatullahi wabarakatuh.</p>
                <p className="py-1">
                  Alhamdulillah, puji syukur atas segala nikmat yang Allah SWT
                  telah berikan kepada kita semua. UPT SMP Negeri 9 Binamu
                  berdiri pada bulan Juli 2007 sebagai sekolah unggulan yang
                  diharapkan menghasilkan lulusan yang unggul dalam bidang
                  akademik maupun nonakademik serta berakhlak mulia.
                </p>
                <p className="py-1">
                  Sekolah ini sebelumnya berdiri dengan nama SMP Negeri Khusus
                  Jeneponto bersama SMA Negeri Khusus Jeneponto dengan satu
                  kepala sekolah dan dibiayai dengan dana APBD. Saat ini UPT SMP
                  Negeri 9 Binamu adalah salah satu Sekolah Penggerak Angkatan
                  kedua dan telah memasuki tahun ketiga. Sejak awal berdiri dan
                  sampai saat ini, UPT SMP Negeri 9 Binamu telah menghasilkan
                  lulusan yang unggul dan banyak yang diterima di SMA dan SMK
                  unggulan di Indonesia dan melanjutkan di perguruan tinggi baik
                  di dalam negeri maupun luar negeri.
                </p>
                <p className="py-1">
                  Saat ini UPT SMP Negeri 9 Binamu memiliki 247 orang peserta
                  didik, berbeda saat diawal berdirinya sekolah hanya memiliki
                  60 peserta didik. Sekolah juga memiliki 22 orang guru dan
                  tenaga pendidik dengan latar belakang pendidikan S-1 dan S-2
                  serta menerapkan kurikulum merdeka dan waktu sekolah adalah 5
                  hari sepekan atau Full Day School (FDS). Prestasi akademik dan
                  nonakademik telah banyak ditorehkan baik di tingkat kabupaten,
                  provinsi dan nasional. Sekolah ini telah menjadi rebutan bagi
                  calon peserta didik baru.
                </p>
              </div>
              <div className="bg-[#154472] px-6 py-3 w-[200px] h-[50px] rounded-full font-bold text-yellow-600">
                Tn. Amirullah, M.Pd
              </div>
            </div>
          </section>
        
      <div className="pt-6">
        <News/>
      </div>
    </>
  )
}
