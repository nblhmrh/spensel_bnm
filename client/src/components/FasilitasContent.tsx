"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export default function FasilitasContent() {
  const [data, setData] = useState<{ id: number; judul: string; deskripsi: string; foto: string }[]>([]);
  const [form, setForm] = useState<{
    judul: string;
    deskripsi: string;
    foto: File | null;
  }>({
    judul: "",
    deskripsi: "",
    foto: null,
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<{ judul: string; deskripsi: string; foto: string } | null>(null);

  const fetchData = async () => {
    try {
      const res = await API.get("/fasilitas");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching fasilitas:", error);
      if (error instanceof Error && (error as import("axios").AxiosError).response?.data) {
        console.log("Response data:", (error as import("axios").AxiosError).response?.data);
      }
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        foto: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const resetForm = () => {
    setForm({
      judul: "",
      deskripsi: "",
      foto: null,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    
    // Debug untuk melihat nilai form
    console.log('Form values:', form);
    
    formData.append('judul', form.judul);
    formData.append('deskripsi', form.deskripsi);
    if (form.foto) {
        formData.append('foto', form.foto);
    }

    // Debug untuk melihat isi FormData
    for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    // Di dalam fungsi handleSubmit, setelah operasi berhasil
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };
        
        if (editMode) {
            const response = await API.post(`/fasilitas/${editId}`, formData, {
                ...config,
                headers: {
                    ...config.headers,
                    'X-HTTP-Method-Override': 'PUT'
                }
            });
            console.log("Respons dari server:", response);
            toast.success("Data berhasil diperbarui!");
            localStorage.setItem('fasilitas_updated', Date.now().toString());
        } else {
            const response = await API.post("/fasilitas", formData, config);
            console.log("Respons dari server:", response);
            toast.success("Data berhasil ditambahkan!");
            localStorage.setItem('fasilitas_updated', Date.now().toString());
        }
        
        resetForm();
        fetchData();
    } catch (error) {
        if (error instanceof Error && (error as import("axios").AxiosError).response) {
          console.error("Error detail:", (error as import("axios").AxiosError).response?.data);
        } else {
          console.error("Error detail:", error);
        }
        
        if (error instanceof Error && (error as import("axios").AxiosError).response) {
            if ((error as AxiosError).response?.status === 422) {
                const validationErrors = ((error as AxiosError).response?.data as { errors: Record<string, string[]> }).errors || {};
                const errorMessages = Object.entries(validationErrors)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n');
                toast.error(`Validasi gagal:\n${errorMessages}`);
            } else {
                const responseData = (error as AxiosError<{ message?: string }>).response?.data;
                toast.error("Gagal menyimpan data: " + (responseData?.message || error.message));
            }
        } else if (error instanceof Error && (error as AxiosError).request) {
            toast.error("Tidak ada respons dari server. Periksa koneksi Anda.");
        } else {
            toast.error("Gagal menyimpan data: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    } finally {
        setLoading(false);
    }
};

  const handleEdit = (item: { id: number; judul: string; deskripsi: string; foto: string }) => {
    setForm({
      judul: item.judul,
      deskripsi: item.deskripsi,
      foto: null,
    });
    setEditMode(true);
    setEditId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    
    // Di dalam fungsi handleDelete, setelah operasi berhasil
    try {
      await API.delete(`/fasilitas/${id}`);
      toast.success("Data berhasil dihapus!");
      localStorage.setItem('fasilitas_updated', Date.now().toString());
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fadeIn">
      <h1 className="text-3xl font-bold text-[#154472] mb-2 transform transition-all duration-500 hover:scale-105">
        Kelola Fasilitas Sekolah
      </h1>
      <p className="text-lg text-gray-600 mb-8 font-normal leading-relaxed tracking-wide animate-slideIn">
        Halaman ini digunakan untuk mengelola informasi fasilitas yang ada di sekolah
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4 transform transition-all duration-300 hover:shadow-xl"
      >
        <div className="transform transition-all duration-300 hover:translate-x-2">
          <label className="block text-gray-700 mb-2">Judul Fasilitas</label>
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black transition-all duration-300 focus:ring-2 focus:ring-[#154472] focus:border-[#154472]"
            required
          />
        </div>
        
        <div className="transform transition-all duration-300 hover:translate-x-2">
          <label className="block text-gray-700 mb-2">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] text-black transition-all duration-300 focus:ring-2 focus:ring-[#154472] focus:border-[#154472]"
            required
          ></textarea>
        </div>
        
        <div className="transform transition-all duration-300 hover:translate-x-2">
          <label className="block text-gray-700 mb-2">Foto</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-black transition-all duration-300"
            accept="image/*"
            required={!editMode}
          />
          {editMode && (
            <p className="text-sm text-gray-500 mt-1 animate-fadeIn">
              Biarkan kosong jika tidak ingin mengubah foto
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#154472] hover:bg-[#1a5a99] text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </span>
            ) : editMode ? "Perbarui" : "Simpan"}
          </button>
          
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 opacity-0 animate-fadeInUp cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setModalData(item)}
          >
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={`http://localhost:8000/storage/${item.foto}`}
                alt={`Fasilitas ${item.judul}`}
                className="w-full h-48 object-cover rounded transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#154472] transition-all duration-300 hover:text-[#1a5a99]">
              {item.judul}
            </h3>
            <p className="text-gray-600 mt-2 mb-4 transition-all duration-300 hover:text-gray-800 overflow-hidden text-ellipsis line-clamp-3">
              {item.deskripsi}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Edit
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Pop Up */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setModalData(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 relative animate-fadeIn flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
              onClick={() => setModalData(null)}
              aria-label="Tutup"
            >
              ×
            </button>
            <img
              src={`http://localhost:8000/storage/${modalData.foto}`}
              alt={modalData.judul}
              className="w-full max-h-60 object-cover rounded-xl mb-4 shadow"
            />
            <h2 className="text-2xl font-bold text-[#154472] mb-2 text-center">{modalData.judul}</h2>
            <p className="text-gray-700 whitespace-pre-line text-center max-h-48 overflow-auto px-2">{modalData.deskripsi}</p>
          </div>
        </div>
      )}
    </div>
  );
}