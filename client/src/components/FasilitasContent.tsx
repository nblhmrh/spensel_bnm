"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";
import { toast } from "react-hot-toast";

export default function FasilitasContent() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    foto: null,
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await API.get("/fasilitas");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching fasilitas:", error);
      console.log("Response data:", error.response?.data);
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        foto: e.target.files[0],
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

  const handleSubmit = async (e) => {
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
    for (let pair of formData.entries()) {
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
        console.error("Error detail:", error.response?.data);
        
        if (error.response) {
            if (error.response.status === 422) {
                const validationErrors = error.response.data.errors || {};
                const errorMessages = Object.entries(validationErrors)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n');
                toast.error(`Validasi gagal:\n${errorMessages}`);
            } else {
                toast.error("Gagal menyimpan data: " + (error.response.data.message || error.message));
            }
        } else if (error.request) {
            toast.error("Tidak ada respons dari server. Periksa koneksi Anda.");
        } else {
            toast.error("Gagal menyimpan data: " + error.message);
        }
    } finally {
        setLoading(false);
    }
};

  const handleEdit = (item) => {
    setForm({
      judul: item.judul,
      deskripsi: item.deskripsi,
      foto: null,
    });
    setEditMode(true);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#154472] mb-6">
        Kelola Fasilitas Sekolah
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-2">Judul Fasilitas</label>
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] text-black"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Foto</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-black"
            accept="image/*"
            required={!editMode}
          />
          {editMode && (
            <p className="text-sm text-gray-500 mt-1">
              Biarkan kosong jika tidak ingin mengubah foto
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#154472] hover:bg-[#1a5a99] text-white py-2 px-4 rounded-lg transition-all"
          >
            {loading ? "Menyimpan..." : editMode ? "Perbarui" : "Simpan"}
          </button>
          
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="mb-4">
              <img
                src={`http://localhost:8000/storage/${item.foto}`}
                alt={item.judul}
                className="w-full h-48 object-cover rounded"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#154472]">{item.judul}</h3>
            <p className="text-gray-600 mt-2 mb-4">{item.deskripsi}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
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