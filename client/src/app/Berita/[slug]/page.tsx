"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/utils/api";
import Link from "next/link"; // Navbar dihapus

export default function DetailBerita() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await API.get("/berita");
        const data = response.data.find((item) => item.slug === slug);
        setBerita(data || null);
      } catch {
        setBerita(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBerita();
  }, [slug]);

  if (loading) return <div>Memuat...</div>;
  if (!berita) return <div>Berita tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-3xl font-bold text-[#154472] mb-6 text-center">
          {berita.judul}
        </h2>
        {berita.foto && (
          <img
            src={`http://localhost:8000/storage/${berita.foto}`}
            alt={berita.judul}
            className="w-full max-h-[350px] object-cover rounded-lg mb-6 border"
            style={{ objectPosition: "center" }}
          />
        )}
        <div className="prose prose-lg max-w-none text-gray-800 mb-4">
          <p className="whitespace-pre-line">{berita.konten}</p>
        </div>
        <div className="text-sm text-gray-500 text-right">
          {berita.tanggal}
        </div>
      </div>
    </div>
  );
}