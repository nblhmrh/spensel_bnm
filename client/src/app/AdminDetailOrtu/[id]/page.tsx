"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function AdminDetailOrtu({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/admin/dataortu/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => setData(res.data));
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4 text-[#154472]">Detail Data Orang Tua/Wali</h1>
      <table className="w-full text-left">
        <tbody>
          <tr><td className="font-semibold text-black">Nama Ayah</td><td className="text-[#154472] font-semibold">{data.nama_ayah}</td></tr>
          <tr><td className="font-semibold text-black">Kontak Ayah</td><td className="text-[#154472] font-semibold">{data.kontak_ayah}</td></tr>
          <tr><td className="font-semibold text-black">Pekerjaan Ayah</td><td className="text-[#154472] font-semibold">{data.pekerjaan_ayah}</td></tr>
          <tr><td className="font-semibold text-black">Penghasilan Ayah</td><td className="text-[#154472] font-semibold">{data.penghasilan_ayah}</td></tr>
          <tr><td className="font-semibold text-black">Alamat Ayah</td><td className="text-[#154472] font-semibold">{data.alamat_ayah}</td></tr>
          <tr><td className="font-semibold text-black">Nama Ibu</td><td className="text-[#154472] font-semibold">{data.nama_ibu}</td></tr>
          <tr><td className="font-semibold text-black">Kontak Ibu</td><td className="text-[#154472] font-semibold">{data.kontak_ibu}</td></tr>
          <tr><td className="font-semibold text-black">Pekerjaan Ibu</td><td className="text-[#154472] font-semibold">{data.pekerjaan_ibu}</td></tr>
          <tr><td className="font-semibold text-black">Penghasilan Ibu</td><td className="text-[#154472] font-semibold">{data.penghasilan_ibu}</td></tr>
          <tr><td className="font-semibold text-black">Alamat Ibu</td><td className="text-[#154472] font-semibold">{data.alamat_ibu}</td></tr>
          {/* Tambahkan field lain sesuai kebutuhan */}
        </tbody>
      </table>
      <button
        onClick={() => router.push("/BerandaAdmin")}
        className="px-4 py-2 bg-[#154472] text-white rounded hover:bg-[#10365a] transition duration-200"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}