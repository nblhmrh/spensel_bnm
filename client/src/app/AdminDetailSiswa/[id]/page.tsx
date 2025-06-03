"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function AdminDetailSiswa({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap params
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/admin/datasiswa/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include", // jika pakai sanctum dan cookie
    })
      .then(res => res.json())
      .then(res => setData(res.data));
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4 text-[#154472]">Detail Data Siswa</h1>
      <table className="w-full text-left mb-6">
        <tbody>
          <tr><td className="font-semibold text-black">NISN</td><td className="text-[#154472] font-semibold">{data.nisn}</td></tr>
          <tr><td className="font-semibold text-black">No. Kartu Keluarga</td><td className="text-[#154472] font-semibold">{data.nik}</td></tr>
          <tr><td className="font-semibold text-black">Nama Lengkap</td><td className="text-[#154472] font-semibold">{data.nama}</td></tr>
          <tr><td className="font-semibold text-black">Jenis Kelamin</td><td className="text-[#154472] font-semibold">{data.jenis_kelamin}</td></tr>
          <tr><td className="font-semibold text-black">Tempat Lahir</td><td className="text-[#154472] font-semibold">{data.tempat_lahir}</td></tr>
          <tr><td className="font-semibold text-black">Tanggal Lahir</td><td className="text-[#154472] font-semibold">{data.tanggal_lahir}</td></tr>
          <tr><td className="font-semibold text-black">Asal Sekolah</td><td className="text-[#154472] font-semibold">{data.asal_sekolah}</td></tr>
          <tr><td className="font-semibold text-black">Desa</td><td className="text-[#154472] font-semibold">{data.desa}</td></tr>
          <tr><td className="font-semibold text-black">RT</td><td className="text-[#154472] font-semibold">{data.rt}</td></tr>
          <tr><td className="font-semibold text-black">RW</td><td className="text-[#154472] font-semibold">{data.rw}</td></tr>
          <tr><td className="font-semibold text-black">Kecamatan</td><td className="text-[#154472] font-semibold">{data.kecamatan}</td></tr>
          <tr><td className="font-semibold text-black">Kabupaten</td><td className="text-[#154472] font-semibold">{data.kabupaten}</td></tr>
          <tr><td className="font-semibold text-black">Provinsi</td><td className="text-[#154472] font-semibold">{data.provinsi}</td></tr>
          <tr><td className="font-semibold text-black">Alamat Lengkap</td><td className="text-[#154472] font-semibold">{data.alamatlengkap}</td></tr>
          <tr><td className="font-semibold text-black">Jarak Rumah ke Sekolah</td><td className="text-[#154472] font-semibold">{data.jarakrumah}</td></tr>
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
