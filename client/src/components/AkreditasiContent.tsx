"use client";

import { useEffect, useState } from "react";
import API from "@/utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AkreditasiContent() {
  const [data, setData] = useState<
    { id: number; instansi: string; no_sk: string; npsn: string; file: string }[]
  >([]);
  const [form, setForm] = useState<{
    instansi: string;
    no_sk: string;
    npsn: string;
    file: File | null;
  }>({
    instansi: "",
    no_sk: "",
    npsn: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await API.get("/akreditasi");
      setData(res.data);
    } catch {
      toast.error("Gagal memuat data");
    }
  };

  useEffect(() => {
    fetchData();

    // Fungsi untuk menangani perubahan storage
    const handleStorageChange = () => {
      const lastUpdate = localStorage.getItem('akreditasi_updated');
      if (lastUpdate) {
        fetchData();
        // Hapus flag setelah digunakan
        localStorage.removeItem('akreditasi_updated');
      }
    };

    // Tambahkan event listener untuk storage dan custom event
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('akreditasi_updated', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('akreditasi_updated', handleStorageChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null) {
        formData.append(k, v as string | Blob);
      }
    });

    try {
      // Tambahkan delay kecil sebelum upload
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await API.post("/akreditasi", formData);
      console.log("Response upload:", response.data);

      toast.success("Data berhasil ditambahkan!");
      localStorage.setItem('akreditasi_updated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('akreditasi_updated'));
      
      setForm({ instansi: "", no_sk: "", npsn: "", file: null });
      
      // Reset form
      const fileInput = e.target as HTMLFormElement;
      fileInput.reset();
      
      fetchData();
    } catch (error) {
      console.error("Error detail:", error.response?.data);
      console.error("Error uploading:", error);
      
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
      await API.delete(`/akreditasi/${id}`);
      toast.success("Data berhasil dihapus!");
      
      // Set flag di localStorage
      localStorage.setItem('akreditasi_updated', Date.now().toString());
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('akreditasi_updated'));
      
      // Reset form state
      setForm({ instansi: "", no_sk: "", npsn: "", file: null });
      
      // Tambahkan delay kecil sebelum fetch data baru
      await new Promise(resolve => setTimeout(resolve, 500));
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#154472] mb-6">
        Kelola Akreditasi
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4 text-gray-700"
      >
        <input
          type="text"
          placeholder="Instansi"
          value={form.instansi}
          onChange={(e) => setForm({ ...form, instansi: e.target.value })}
          className="border w-full p-2 rounded text-gray-700"
          required
        />
        <input
          type="text"
          placeholder="No SK"
          value={form.no_sk}
          onChange={(e) => setForm({ ...form, no_sk: e.target.value })}
          className="border w-full p-2 rounded text-gray-700"
          required
        />
        <input
          type="text"
          placeholder="NPSN"
          value={form.npsn}
          onChange={(e) => setForm({ ...form, npsn: e.target.value })}
          className="border w-full p-2 rounded text-gray-700"
          required
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setForm({ ...form, file: e.target.files[0] });
            }
          }}
          className="w-full text-black"
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
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center text-gray-700"
          >
            <div>
              <p className="font-semibold text-[#154472]">{item.instansi}</p>
              <p className="text-sm text-gray-700">No SK: {item.no_sk}</p>
              <p className="text-sm text-gray-700">NPSN: {item.npsn}</p>
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
