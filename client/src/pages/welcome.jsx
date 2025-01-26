import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";
// import ftskul from "../assets/ftskul.jpg";
import laskar from "../assets/laskar.jpg";
import News from './News';
import {
  FaBuilding,
  FaChalkboardTeacher,
  FaLeaf,
  FaHandshake,
} from "react-icons/fa";

export default function Home() {
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
      <div>
        <section className="flex flex-col items-center text-center py-11 px-12">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#154472]">
            Kenapa harus UPT SMP Negeri 9 Binamu Jeneponto ?
          </h1>
          <p className="text-[#5F5F5F] py-3">
            Alasan kenapa kalian harus memilih untuk bergabung dengan SMPN 9
            Binamu Jeneponto.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-12 py-8">
          {/* Fasilitas Lengkap */}
          <div className="flex flex-col items-center text-center">
            <FaBuilding className="text-[#154472] text-5xl mb-4" />
            <h3 className="font-semibold text-lg text-[#154472]">
              Fasilitas Lengkap
            </h3>
            <p className="text-[#5F5F5F]">
              Dukungan belajar terbaik dengan kualitas premium.
            </p>
          </div>

          {/* Lingkungan Nyaman */}
          <div className="flex flex-col items-center text-center">
            <FaLeaf className="text-[#154472] text-5xl mb-4" />
            <h3 className="font-semibold text-lg text-[#154472]">
              Lingkungan Nyaman
            </h3>
            <p className="text-[#5F5F5F]">
              Menempati lingkungan yang ramah, tenang, dan ideal.
            </p>
          </div>

          {/* Pengajar Kompeten */}
          <div className="flex flex-col items-center text-center">
            <FaChalkboardTeacher className="text-[#154472] text-5xl mb-4" />
            <h3 className="font-semibold text-lg text-[#154472]">
              Pengajar Kompeten
            </h3>
            <p className="text-[#5F5F5F]">
              Guru yang relevan dengan kebutuhan zaman.
            </p>
          </div>

          {/* Kerjasama Luas */}
          <div className="flex flex-col items-center text-center">
            <FaHandshake className="text-[#154472] text-5xl mb-4" />
            <h3 className="font-semibold text-lg text-[#154472]">
              Kerjasama Luas
            </h3>
            <p className="text-[#5F5F5F]">
              Mengembangkan peluang profesional selama masa studi.
            </p>
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-between px-12 py-8 bg-white">
          {/* Shape Kuning */}
          <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0">
            <div className="bg-yellow-400 w-48 h-64 rounded-full transform rotate-45"></div>
          </div>

          {/* Sambutan Teks */}
          <div className="w-full md:w-2/3">
            <h2 className="text-lg md:text-xl font-bold text-[#154472] mb-4">
              SAMBUTAN KEPALA SEKOLAH
            </h2>
            <div className="text-[#5F5F5F] leading-relaxed">
              <p>Assalamualaikum warahmatullahi wabarakatuh.</p>
              <p className="py-1">
                Alhamdulillah, puji syukur atas segala nikmat yang Allah SWT
                telah berikan kepada kita semua. UPT SMP Negeri 9 Binamu berdiri
                pada bulan Juli 2007 sebagai sekolah unggulan yang diharapkan
                menghasilkan lulusan yang unggul dalam bidang akademik maupun
                nonakademik serta berakhlak mulia.
              </p>
              <p className="py-1">
                Sekolah ini sebelumnya berdiri dengan nama SMP Negeri Khusus
                Jeneponto bersama SMA Negeri Khusus Jeneponto dengan satu kepala
                sekolah dan dibiayai dengan dana APBD. Saat ini UPT SMP Negeri 9
                Binamu adalah salah satu Sekolah Penggerak Angkatan kedua dan
                telah memasuki tahun ketiga. Sejak awal berdiri dan sampai saat
                ini, UPT SMP Negeri 9 Binamu telah menghasilkan lulusan yang
                unggul dan banyak yang diterima di SMA dan SMK unggulan di
                Indonesia dan melanjutkan di perguruan tinggi baik di dalam
                negeri maupun luar negeri.
              </p>
              <p className="py-1">
                Saat ini UPT SMP Negeri 9 Binamu memiliki 247 orang peserta
                didik, berbeda saat diawal berdirinya sekolah hanya memiliki 60
                peserta didik. Sekolah juga memiliki 22 orang guru dan tenaga
                pendidik dengan latar belakang pendidikan S-1 dan S-2 serta
                menerapkan kurikulum merdeka dan waktu sekolah adalah 5 hari
                sepekan atau Full Day School (FDS). Prestasi akademik dan
                nonakademik telah banyak ditorehkan baik di tingkat kabupaten,
                provinsi dan nasional. Sekolah ini telah menjadi rebutan bagi
                calon peserta didik baru.
              </p>
            </div>
          </div>
        </section>
      </div>
       <News/>
      </div>
     
    
    </>
  );
}
