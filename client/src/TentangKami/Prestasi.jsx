import React from 'react'

function Prestasi() {
  return (
    <>
       <div className="bg-[#154472] w-[1382px] h-[300px]">
        <Navbar />

        <section className="flex flex-col py-8 px-6">
          <h1 className="text-3xl md:text-4xl font-bold  text-[#ffff]">
            Prestasi
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
            &gt; <span className="text-gray-300 ">Prestasi</span>
          </p>
        </section>
      </div>
    </>
  )
}

export default Prestasi
