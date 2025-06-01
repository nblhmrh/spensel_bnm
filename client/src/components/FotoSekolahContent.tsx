"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function FotoSekolahContent() {
  const router = useRouter();
  const [data, setData] = useState<{ id: number; file: string }[]>([]);
  const [form, setForm] = useState<{
    file: File | null;
  }>({
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await API.get("/foto-sekolah");
      setData(res.data);
      console.log (res.data);
    } catch {
      toast.error("Gagal memuat data");
    }
  };

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
    if (!userObj.role || userObj.role !== "admin") {
      router.replace("/Welcome");
    }
  }, [router]);

  useEffect(() => {
    fetchData();

    // Fungsi untuk menangani perubahan storage
    const handleStorageChange = () => {
      const lastUpdate = localStorage.getItem('foto_sekolah_updated');
      if (lastUpdate) {
        fetchData();
        // Hapus flag setelah digunakan
        localStorage.removeItem('foto_sekolah_updated');
      }
    };

    // Tambahkan event listener untuk storage dan custom event
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('foto_sekolah_updated', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('foto_sekolah_updated', handleStorageChange);
    };
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/foto-sekolah/${id}`);
      toast.success("Data berhasil dihapus!");
      
      // Set flag di localStorage dan dispatch event
      localStorage.setItem('foto_sekolah_updated', Date.now().toString());
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('foto_sekolah_updated'));
      
      // Reset form state
      setForm({ file: null });
      
      // Tambahkan delay kecil sebelum fetch data baru
      await new Promise(resolve => setTimeout(resolve, 500));
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (form.file) {
      formData.append('file', form.file);
    }

    try {
      // Hapus file lama terlebih dahulu
      if (data.length > 0) {
        await API.delete(`/foto-sekolah/${data[0].id}`);
      }

      // Upload file baru
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      
      await API.post("/foto-sekolah", formData, config);
      toast.success("Foto berhasil ditambahkan!");
      setForm({ file: null });
      
      // Trigger refresh di halaman welcome dengan kedua event
      localStorage.setItem('foto_sekolah_updated', Date.now().toString());
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('foto_sekolah_updated'));
      
      fetchData();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error("Gagal menambahkan foto: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
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