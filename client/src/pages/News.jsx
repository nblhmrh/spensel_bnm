import React from "react";
import Card from '@/pages/Card'
function News() {
  return (
    <>
      <div className="bg-[#154472] w-full h-screen flex flex-col items-center justify-center">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          BERITA TERKINI
        </h1>
        <h2 className="text-3xl font-semibold text-yellow-300 text-center mb-8">
          UPT SMP NEGERI 9 BINAMU
        </h2>

        {/* News Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 max-w-screen-lg">
          {/* Top-left card */}
          <div className="bg-white w-full h-48 rounded-md shadow-md"></div>

          {/* Top-center card */}
          <div className="bg-white w-full h-48 rounded-md shadow-md"></div>

          {/* Top-right card */}
          <div className="bg-white w-full h-48 rounded-md shadow-md"></div>

          {/* Bottom-center card */}
          <div className="bg-white w-full h-48 rounded-md shadow-md md:col-span-2 lg:col-span-1 lg:col-start-2"></div>
        </div>
      </div>
      <Card/>
     
    </>
  );
}

export default News;
