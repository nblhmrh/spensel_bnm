"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../Navbar/page";
import { StaticImageData } from "next/image";
import Link from "next/link";
import News from "@/pages/News";
import videdu from "@/assets/videdu.png";
import klasik1 from "@/assets/klasik1.png";
import klasik2 from "@/assets/klasik2.png";
import klasik3 from "@/assets/klasik3.png";
import papan from "@/assets/papan.png";
import konseling from "@/assets/konseling.png";
import bk from "@/assets/bk.png";
import assesmen from "@/assets/assesmen.png";

const images = [
  { src: [videdu], title: "Video Edukasi" },
  { src: [klasik1, klasik2, klasik3], title: "Bimbingan Klasikal" },
  { src: [papan], title: "Papan Bimbingan" },
  { src: [konseling], title: "Konseling" },
  { src: [bk], title: "Bimbingan & Konseling" },
  { src: [assesmen], title: "Assesmen" },
];

type ImageType = {
  src: StaticImageData[];
  title: string;
};

const DokumentasiBK = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
    setCurrentSubIndex(0);
  };

  const closeModal = () => setSelectedImage(null);

  const nextImage = () => {
    if (selectedImage && selectedImage.src.length > 1) {
      setCurrentSubIndex((prev) => (prev + 1) % selectedImage.src.length);
    } else {
      const newIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[newIndex]);
      setCurrentIndex(newIndex);
      setCurrentSubIndex(0);
    }
  };

  const prevImage = () => {
    if (selectedImage && selectedImage.src.length > 1) {
      setCurrentSubIndex(
        (prev) =>
          (prev - 1 + selectedImage.src.length) % selectedImage.src.length
      );
    } else {
      const newIndex = (currentIndex - 1 + images.length) % images.length;
      setSelectedImage(images[newIndex]);
      setCurrentIndex(newIndex);
      setCurrentSubIndex(0);
    }
  };

  return (
    <>
      <div>
        <div className="bg-[#154472] w-[1382px] h-[300px]">
          <Navbar />

          <section className="flex flex-col py-8 px-6">
            <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
              Dokumentasi BK
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
              <Link
                href="/B-Dokumentasi"
                className="underline hover:text-gray-300"
              >
                Dokumentasi
              </Link>{" "}
            </p>
          </section>
        </div>

        <div className="px-6 py-8">
          <p className="text-gray-700 text-2xl font-medium py-1 text-center">
            Kami percaya bahwa setiap siswa memiliki potensi untuk sukses.
            Melalui layanan BK yang komprehensif, kami berupaya memfasilitasi
            pengembangan diri siswa secara optimal.
          </p>
        </div>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => openModal(index)}
              >
                <Image
                  src={img.src[0]}
                  alt={img.title}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full py-2 rounded-b-lg">
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <button
              className="absolute left-4 text-white text-2xl"
              onClick={prevImage}
            >
              &lt;
            </button>
            <Image
              src={selectedImage.src[currentSubIndex]}
              alt={selectedImage.title}
              width={600}
              height={450}
              className="rounded-lg"
            />
            <button
              className="absolute right-4 text-white text-2xl"
              onClick={nextImage}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <News />
    </>
  );
};

export default DokumentasiBK;
