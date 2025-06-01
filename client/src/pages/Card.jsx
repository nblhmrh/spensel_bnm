"use client";

import React from "react";
import { useRouter } from 'next/navigation';
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

// Social media links configuration
const socialLinks = [
  { href: "https://youtube.com/@sphenkhus?si=D4-opkCaeA5mB37q", Icon: FaYoutube, hoverColor: "hover:text-red-500", label: "YouTube" },
  { href: "https://www.facebook.com/share/eqBWtL2vPsvEkZ15/?mibextid=LQQJ4d", Icon: FaFacebook, hoverColor: "hover:text-blue-500", label: "Facebook" },
  { href: "https://www.instagram.com/uptsmpn9binamu?igsh=YW5sbmNoM2NsNGJp&utm_source=qr", Icon: FaInstagram, hoverColor: "hover:text-pink-500", label: "Instagram" },
  { href: "https://www.tiktok.com/@uptsmpn9binamu?_t=ZS-8t4suDKPaqH&_r=1", Icon: FaTiktok, hoverColor: "hover:text-black", label: "TikTok" },
];

// Contact information component
const ContactInfo = () => (
  <div className="space-y-4 px-4 sm:px-0">
    <h2 className="text-xl sm:text-2xl font-bold hover:text-yellow-300 transition-colors duration-300">
      Hubungi Kami Sekarang
    </h2>
    <div className="space-y-3">
      <p className="flex items-center space-x-2 hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
        <FaLocationDot className="flex-shrink-0 hover:text-yellow-300" />
        <span>Empoang, Kec. Binamu, Kabupaten Jeneponto, Sulawesi Selatan 92311</span>
      </p>
      <p className="flex items-center space-x-2 hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
        <FaPhone className="flex-shrink-0 hover:text-yellow-300" />
        <span>0411 088 222 333</span>
      </p>
      <p className="flex items-center space-x-2 hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
        <FaEnvelope className="flex-shrink-0 hover:text-yellow-300" />
        <span>smpn9.binamu@gmail.com</span>
      </p>
    </div>
  </div>
);

// Social media links component
const SocialLinks = () => (
  <div className="flex justify-center sm:justify-start space-x-4 pt-4">
    {socialLinks.map((social, index) => (
      <Link
        key={index}
        href={social.href}
        target="_blank"
        className="transform transition-all duration-300 hover:scale-125"
        aria-label={social.label}
      >
        <social.Icon 
          className={`text-white text-xl sm:text-2xl ${social.hoverColor} transition-colors duration-300`} 
        />
      </Link>
    ))}
  </div>
);

// Hero section component
const HeroSection = ({ router }) => (
  <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
    <Image
      src={gerbang}
      alt="Gerbang Sekolah"
      layout="fill"
      objectFit="cover"
      quality={90}
      className="transition-transform duration-700 hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 hover:bg-black/30 hover:backdrop-blur-[1px]" />
    
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 space-y-4">
      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold animate-fadeIn transition-all duration-300 hover:scale-105 text-center">
        FAQ PPDB
      </h1>
      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold px-4 py-2">
          Cari tahu cara menjadi siswa/i di UPT SMPN 9 Binamu
        </h2>
      </div>
      <button 
        onClick={() => router.push('/PPDB')}
        className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-white text-white font-semibold rounded-full
        transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-sm sm:text-base"
      >
        Klik disini
      </button>
    </div>
  </div>
);

function ContactSection() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection router={router} />

      {/* Footer Section */}
      <div className="bg-[#154472] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Logo Section */}
            <div className="flex justify-center md:justify-start">
              <Image
                src={logo}
                alt="Logo SMPN 9 Binamu"
                width={150}
                height={150}
                className="transition-transform duration-300 hover:rotate-3 w-32 sm:w-40 md:w-48"
              />
            </div>

            {/* Contact Info Section */}
            <div className="space-y-4">
              <ContactInfo />
              <SocialLinks />
            </div>

            {/* Map Section */}
            <div className="w-full h-[200px] sm:h-[250px] relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.4384171366344!2d119.71264557504132!3d-5.518694153612288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefb5dfdbd4e1b%3A0x563c2906d4b8e3b9!2sUPT%20SMP%20NEGERI%209%20BINAMU!5e0!3m2!1sid!2sid!4v1707571936686!5m2!1sid!2sid"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Lokasi SMPN 9 Binamu"
              />
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center mt-8 pt-4 border-t border-white/20">
            <p className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors duration-300">
              Copyright © 2025 SMPN 9 Binamu | Rinuvella | All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
