"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";
import { toast } from "react-hot-toast";

export default function FotoSekolahContent() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await API.get("/foto-sekolah");
      setData(res.data);
    } catch {
      toast.error("Gagal memuat data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (form.file) {
      formData.append('file', form.file);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      
      await API.post("/foto-sekolah", formData, config);
      toast.success("Foto berhasil ditambahkan!");
      setForm({ file: null });
      
      // Trigger refresh di halaman welcome
      localStorage.setItem('foto_sekolah_updated', 'true');
      // Dispatch event untuk halaman lain yang mungkin terbuka
      window.dispatchEvent(new Event('storage'));
      
      fetchData();
    } catch (error) {
      console.error("Error upload:", error);
      toast.error("Gagal menambahkan foto: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/foto-sekolah/${id}`);
      toast.success("Foto berhasil dihapus!");
      
      // Trigger refresh di halaman welcome
      localStorage.setItem('foto_sekolah_updated', 'true');
      // Dispatch event untuk halaman lain yang mungkin terbuka
      window.dispatchEvent(new Event('storage'));
      
      fetchData();
    } catch {
      toast.error("Gagal menghapus foto.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#154472] mb-6">
        Kelola Foto Sekolah
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4"
      >
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setForm({ file: e.target.files[0] });
            }
          }}
          className="w-full"
          accept="image/*"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#154472] hover:bg-[#1a5a99] text-white py-2 px-4 rounded-lg transition-all"
        >
          {loading ? "Mengunggah..." : "Upload"}
        </button>
      </form>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <img
                src={`http://localhost:8000/storage/${item.file}`}
                alt="Foto Sekolah"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800 transition"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}