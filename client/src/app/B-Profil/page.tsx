import React from 'react';
import Navbar from '../Navbar/page';
import Image from 'next/image';
import Link from 'next/link';
import nafilah from '@/assets/nafilah.jpg'
import News from '@/pages/News';

function Profil() {
  return (
    <>
      <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
           Profil BK
          </h1>
          <p className="text-white mt-2 py-3 font-normal">
            <Link href="/" className="underline hover:text-gray-300">
              Beranda
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/BK"
              className="underline hover:text-gray-300"
            >
              BK
            </Link>{" "}
            &gt;{" "}
            <Link
              href="/B-Profil"
              className="underline hover:text-gray-300"
            >
              Profil BK
            </Link>{" "}
          
          </p>
        </section>
      </div>

      <div className="max-w-6xl mx-auto ml-18 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-gray-800 text-lg leading-relaxed text-center">
          <p>
            Pendidikan berkualitas dimulai dari dukungan emosional, mental, dan sosial yang kuat. Dengan
            memanfaatkan teknologi digital, Bimbingan dan Konseling (BK) UPT SMPN 9 Binamu berkomitmen
            untuk menghadirkan layanan yang interaktif, adaptif, dan relevan dengan kebutuhan siswa di era
            globalisasi. Kami berupaya menyediakan layanan yang modern, inklusif, dan berorientasi pada
            pengembangan karakter siswa sesuai dengan nilai-nilai Profil Pelajar Pancasila.
          </p>
          <p className="mt-4">
            Website ini dirancang sebagai platform informasi dan komunikasi yang mendukung kebutuhan siswa,
            orang tua, warga sekolah, dan masyarakat dalam memahami serta mengakses layanan Bimbingan dan
            Konseling secara mudah dan efektif.
          </p>
        </div>
        <div className="bg-[#154472] p-6 rounded-lg shadow-md text-center text-white font-medium">
           <h2 className="mt-4 text-xl font-semibold text-center pb-8">Guru BK SMPN 9 Binamu</h2>
           <Image src={nafilah} width={250} height={250} alt="Foto Guru BK" className="pb-8 mx-auto rounded-lg" />
          <p className="mt-2 font-medium ">Nama: Nafilah Amaliah. AR, S.Pd., M.Pd.</p>
          <p>TTL: Ujung Pandang, 30 Mei 1999</p>
          <p>Pendidikan Terakhir: S2 Bimbingan dan Konseling</p>
          <p className="mt-2 text-white underline hover:text-gray-300 "><a href="https://instagram.com/nfilaa_" target="_blank">Instagram: @nfilaa_</a></p>
        </div>
      </div>
      <News/>
    </>
  );
}

export default Profil;
