import React from 'react'
import Navbar from '../Navbar/page'
import Link from 'next/link'

function Dokumen() {
  return (
    <>
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
            <Link
              href="/BK"
              className="underline hover:text-gray-300"
            >
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
    </>
  )
}

export default Dokumen
