"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../utils/api";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

export default function PengaduanBKContent() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(0);

  // Proteksi role bk
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      router.replace("/Welcome");
      return;
    }
    let userObj;
    try {
      userObj = JSON.parse(user);
    } catch {
      router.replace("/Welcome");
      return;
    }
    if (!userObj.role || userObj.role !== "bk") {
      router.replace("/Welcome");
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
      setRefresh((r) => r + 1); // trigger refresh data
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
      } else {
        await API.post("/pengaduan", {
          name,
          kelas,
          email,
          pesan,
        });
        alert("Pengaduan berhasil dikirim!");
      }
      setEditId(null);
      setName("");
      setKelas("");
      setEmail("");
      setPesan("");
      setRefresh((r) => r + 1); // trigger refresh data
    } catch (err) {
      alert("Gagal mengupdate data pengaduan");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-[#154472] flex items-center gap-2">
          <span className="inline-block bg-blue-200 rounded-full p-2">
            <FaEdit className="text-blue-700" />
          </span>
          Layanan BK Admin - Pengaduan
        </h1>

        {editId && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white rounded-xl shadow-lg p-6 space-y-4 border border-blue-100"
          >
            <h2 className="text-xl font-bold text-blue-700 mb-2">Edit Pengaduan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 rounded-lg w-full text-black focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="text"
                placeholder="Kelas"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="border p-3 rounded-lg w-full text-black focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 rounded-lg w-full text-black focus:ring-2 focus:ring-blue-300"
                required
              />
              <textarea
                placeholder="Pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                className="border p-3 rounded-lg w-full text-black focus:ring-2 focus:ring-blue-300 md:col-span-2"
                required
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition"
              >
                Batal Edit
              </button>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-bold transition"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Update Pengaduan"}
              </button>
            </div>
          </form>
        )}

        {/* Modal Lihat Detail */}
        {modalData && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button
                onClick={() => setModalData(null)}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                aria-label="Tutup"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-blue-700">Detail Pengaduan</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-700">Nama:</span>
                  <span className="ml-2 text-gray-900">{modalData.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Kelas:</span>
                  <span className="ml-2 text-gray-900">{modalData.kelas}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-900">{modalData.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Pesan:</span>
                  <div className="mt-1 p-2 bg-gray-100 rounded text-gray-900 break-words max-h-40 overflow-auto">
                    {modalData.pesan}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-[#154472]">Daftar Pengaduan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="border px-4 py-2">Nama</th>
                  <th className="border px-4 py-2">Kelas</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Pesan</th>
                  <th className="border px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition">
                    <td className="border px-4 py-2 text-black">{item.name}</td>
                    <td className="border px-4 py-2 text-black">{item.kelas}</td>
                    <td className="border px-4 py-2 text-black">{item.email}</td>
                    <td className="border px-4 py-2 text-black max-w-[100px] truncate" title={item.pesan}>
                      {item.pesan}
                    </td>
                    <td className="border px-4 py-2 flex gap-2 justify-center">
                      <button
                        onClick={() => setModalData(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow transition flex items-center gap-1"
                        title="Lihat"
                      >
                        <FaEye />
                        Lihat
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow transition flex items-center gap-1"
                        title="Edit"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition flex items-center gap-1"
                        title="Hapus"
                      >
                        <FaTrashAlt />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Tidak ada data pengaduan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}