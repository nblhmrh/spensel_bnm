"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";
import { toast } from "react-hot-toast";

export default function StrukturContent() {
  const [data, setData] = useState<{ id: number; file: string }[]>([]);
  const [form, setForm] = useState<{
    file: File | null;
  }>({
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await API.get("/struktur");
      setData(res.data);
    } catch {
      toast.error("Gagal memuat data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (form.file) {
      formData.append('file', form.file);
    }
  
    console.log("Data yang dikirim ke API:", formData.get('file'));
  
    try {
      const response = await API.post("/struktur", formData);
      console.log("Response upload:", response.data);
      toast.success("Data berhasil ditambahkan!");
      setForm({ file: null });
      fetchData();
    } catch (error) {
      console.error("Error uploading file:", error);
      
      // Improved error handling
      let errorMessage = "Gagal menambahkan data.";
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = (error as { response?: { data?: { message?: string } } }).response?.data;
        if (errorResponse?.message) {
          errorMessage = errorResponse.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/struktur/${id}`);
      toast.success("Data berhasil dihapus!");
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#154472] mb-6">
        Kelola Struktur Organisasi
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
                alt="struktur"
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
