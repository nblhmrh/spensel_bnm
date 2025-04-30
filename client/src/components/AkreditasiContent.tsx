"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import API from "@/utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AkreditasiContent() {
  const [data, setData] = useState<
    { id: number; file: string }[]
  >([]);
  const [form, setForm] = useState<{
    file: File | null;
  }>({file: null});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await API.get("/akreditasi");
      setData(res.data);
    } catch (error) {
      let errorMessage = "Gagal memuat data";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || "Gagal memuat data";
      }
      toast.error(errorMessage);
      console.error("Error fetching data:", error);
      setData([]); // Reset data on error
    }
  };

  useEffect(() => {
    fetchData();

    const handleStorageChange = () => {
      const lastUpdate = localStorage.getItem('akreditasi_updated');
      if (lastUpdate) {
        fetchData();
        localStorage.removeItem('akreditasi_updated');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('akreditasi_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('akreditasi_updated', handleStorageChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // File validation
      if (!form.file) {
        toast.error("Please select a file");
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(form.file.type)) {
        toast.error("Please select a valid image file (JPG, JPEG, PNG, or WEBP)");
        return;
      }

      // Validate file size (2MB = 2 * 1024 * 1024 bytes)
      if (form.file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }

      const formData = new FormData();
      formData.append('file', form.file);

      const response = await API.post("/akreditasi", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          console.log('Upload progress:', percentCompleted);
        }
      });

      if (response.data?.success) {
        toast.success("Data berhasil ditambahkan!");
        localStorage.setItem('akreditasi_updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('akreditasi_updated'));
        
        setForm({ file: null });
        (e.target as HTMLFormElement).reset();
        fetchData();
      } else {
        throw new Error(response.data?.message || "Failed to upload file");
      }
    } catch (error) {
      console.error("Error detail:", error);
      
      let errorMessage = "Gagal menambahkan data.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string, errors?: Record<string, string[]> } } };
        if (axiosError.response?.data?.errors) {
          const errors = axiosError.response.data.errors;
          errorMessage = Object.values(errors).flat().join(', ');
        } else {
          errorMessage = axiosError.response?.data?.message || "Gagal mengunggah file";
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
      localStorage.setItem('akreditasi_updated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('akreditasi_updated'));
      setForm({ file: null });
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
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setForm({ file: e.target.files[0] });
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
            <div className="w-20 h-20 relative overflow-hidden rounded">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${item.file}`}
                alt="Dokumen Akreditasi"
                fill
                className="object-cover"
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
