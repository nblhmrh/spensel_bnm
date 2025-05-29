"use client";
import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function LayananBKAdmin() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get("/pengaduan");
      setData(res.data);
    } catch (err) {
      alert("Gagal memuat data pengaduan");
    }
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setName(item.name);
    setKelas(item.kelas);
    setEmail(item.email);
    setPesan(item.pesan);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName("");
    setKelas("");
    setEmail("");
    setPesan("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await API.delete(`/pengaduan/${id}`);
      fetchData();
    } catch (err) {
      alert("Gagal menghapus data pengaduan");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !kelas || !email || !pesan) {
      alert("Semua field wajib diisi!");
      return;
    }
    try {
      if (editId) {
        await API.put(`/pengaduan/${editId}`, {
          name,
          kelas,
          email,
          pesan,
        });
        alert("Data pengaduan berhasil diupdate!");
      }
      setEditId(null);
      setName("");
      setKelas("");
      setEmail("");
      setPesan("");
      fetchData();
    } catch (err) {
      alert("Gagal mengupdate data pengaduan");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-[#154472]">Layanan BK Admin - Pengaduan</h1>
      {editId && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full text-black"
            required
          />
          <input
            type="text"
            placeholder="Kelas"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="border p-2 rounded w-full text-black"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full text-black"
            required
          />
          <textarea
            placeholder="Pesan"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            className="border p-2 rounded w-full text-black"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Update Pengaduan"}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Batal Edit
            </button>
          </div>
        </form>
      )}
      <hr className="mb-6" />
      <h2 className="text-xl font-semibold mb-2 text-[#154472]">Daftar Pengaduan</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-black">Nama</th>
              <th className="border px-4 py-2 text-black">Kelas</th>
              <th className="border px-4 py-2 text-black">Email</th>
              <th className="border px-4 py-2 text-black">Pesan</th>
              <th className="border px-4 py-2 text-black">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td className="border px-4 py-2 text-black">{item.name}</td>
                <td className="border px-4 py-2 text-black">{item.kelas}</td>
                <td className="border px-4 py-2 text-black">{item.email}</td>
                <td className="border px-4 py-2 text-black">{item.pesan}</td>
                <td className="border px-4 py-2 flex gap-2 ">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">Tidak ada data pengaduan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}