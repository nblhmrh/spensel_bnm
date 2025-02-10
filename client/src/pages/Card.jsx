"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import logo from "@/assets/logo.png";
import gerbang from "@/assets/gerbang.png";

function ContactSection() {
  return (
    <>
      <div className="relative w-full h-[300px] flex flex-col items-center justify-center text-center text-white">
        <Image
          src={gerbang}
          alt="Gerbang Sekolah"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="text-4xl font-bold z-10">FAQ PPDB</h1>
        <div className="relative z-10 mt-4">
          <div className="absolute inset-0 bg-blue-950 opacity-70 rounded-full" />
          <h2 className="relative rounded-full px-8 py-2 text-2xl font-semibold">
            Cari tahu cara menjadi siswa/i di UPT SMPN 9 Binamu
          </h2>
        </div>
        <button className="z-10 mt-6 px-6 py-3 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-black transition">
          Klik disini
        </button>
      </div>

      <div className="bg-[#154472] text-white p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section */}
        <div className="align-items-left">
          <Image
            src={logo}
            alt="Logo SMPN 9 Binamu"
            width={250}
            height={250}
            className="mb-4"
          />
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col space-y-4 max-w-lg text-left">
            <h2 className="text-2xl font-bold">Hubungi Kami Sekarang</h2>
            <p className="flex items-center">
              <FaLocationDot className="mr-2" />
              Empoang, Kec. Binamu, Kabupaten Jeneponto, Sulawesi Selatan 92311
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-2" />
              0411 088 222 333
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-2" />
              smpn9.binamu@gmail.com
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://youtube.com/@sphenkhus?si=D4-opkCaeA5mB37q"
                target="_blank"
              >
                <FaYoutube className="text-white text-2xl hover:text-red-500" />
              </Link>
              <Link
                href="https://www.facebook.com/share/eqBWtL2vPsvEkZ15/?mibextid=LQQJ4d"
                target="_blank"
              >
                <FaFacebook className="text-white text-2xl hover:text-blue-500" />
              </Link>
              <Link
                href="https://www.instagram.com/uptsmpn9binamu?igsh=YW5sbmNoM2NsNGJp&utm_source=qr"
                target="_blank"
              >
                <FaInstagram className="text-white text-2xl hover:text-pink-500" />
              </Link>
              <Link
                href="https://www.tiktok.com/@uptsmpn9binamu?_t=ZS-8t4suDKPaqH&_r=1"
                target="_blank"
              >
                <FaTiktok className="text-white text-2xl hover:text-black" />
              </Link>
            </div>
            <p className="text-sm mt-4 text-center">
              Copyright © 2025 SMPN 9 Binamu | Rinuvelia | All rights reserved.
            </p>
          </div>

          {/* Right Section (Google Maps) */}
          <div className="w-1/3 max-w-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.4384171366344!2d119.71264557504132!3d-5.518694153612288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefb5dfdbd4e1b%3A0x563c2906d4b8e3b9!2sUPT%20SMP%20NEGERI%209%20BINAMU!5e0!3m2!1sid!2sid!4v1707571936686!5m2!1sid!2sid"
              width="100%"
              height="250"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactSection;
