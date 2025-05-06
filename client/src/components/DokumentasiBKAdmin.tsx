"use client";
import React, { useEffect, useState } from "react";
import API from "../utils/api"; // Pastikan path ini sesuai dengan lokasi file API instance Anda

export default function DokumentasiBKAdmin() {
  const [data, setData] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get("/dokumentasibk");
      setData(res.data);
    } catch (err) {
      alert("Gagal memuat data dokumentasi");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !deskripsi || (!foto && !editId)) {
      alert("Semua field wajib diisi!");
      return;
    }
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    if (foto) formData.append("foto", foto);

    try {
      if (editId) {
        await API.post(`/dokumentasibk/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Dokumentasi berhasil diupdate!");
      } else {
        await API.post("/dokumentasibk", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Dokumentasi berhasil ditambah!");
      }
      setJudul("");
      setDeskripsi("");
      setFoto(null);
      setEditId(null);
      fetchData();
    } catch (err) {
      alert(editId ? "Gagal mengupdate dokumentasi" : "Gagal menambah dokumentasi");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await API.delete(`/dokumentasibk/${id}`);
      fetchData();
    } catch (err) {
      alert("Gagal menghapus dokumentasi");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-[#154472]">Dokumentasi BK Admin</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="border p-2 rounded w-full text-black"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border p-2 rounded w-full text-black"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files ? e.target.files[0] : null)}
          className="border p-2 rounded w-full text-black"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading
              ? "Menyimpan..."
              : editId
              ? "Update Dokumentasi"
              : "Tambah Dokumentasi"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>
      <hr className="mb-6" />
      <h2 className="text-xl font-semibold mb-2 text-[#154472]">Daftar Dokumentasi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item: any) => (
          <div key={item.id} className="border rounded p-4 flex flex-col items-center ">
            <img
              src={`http://localhost:8000/storage/${item.foto}`}
              alt={`dokumentasibk ${item.judul}`}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="font-bold ">{item.judul}</h3>
            <p className="text-sm ">{item.deskripsi}</p>
            <div className="flex gap-2 mt-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}