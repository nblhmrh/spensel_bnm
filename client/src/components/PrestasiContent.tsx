"use client";

import React, { useState, useEffect } from "react";
import API from "@/utils/api";
import { toast } from "react-toastify";

interface Prestasi {
  id: number;
  judul: string;
  tingkat: string;
  siswa: string[];
  deskripsi: string;
  tanggal: string;
  tahun: string;
  gambar: string;
}

export default function PrestasiAdmin() {
  const [prestasi, setPrestasi] = useState<Prestasi[]>([]);
  const [form, setForm] = useState({
    judul: "",
    tingkat: "",
    siswa: [] as string[],
    deskripsi: "",
    tanggal: "",
    tahun: "",
    gambar: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [namaSiswa, setNamaSiswa] = useState("");

  const fetchPrestasi = async () => {
    try {
      const response = await API.get("/prestasi");
      setPrestasi(response.data);
    } catch (error) {
      toast.error("Gagal memuat data prestasi");
    }
  };

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({
        ...form,
        gambar: e.target.files[0],
      });
    }
  };

  const resetForm = () => {
    setForm({
      judul: "",
      tingkat: "",
      siswa: [],
      deskripsi: "",
      tanggal: "",
      tahun: "",
      gambar: null,
    });
    setEditId(null);
  };

  const handleEdit = (item: Prestasi) => {
    setEditId(item.id);
    setForm({
      judul: item.judul,
      tingkat: item.tingkat,
      siswa: item.siswa || [], // Tambahkan default array kosong
      deskripsi: item.deskripsi,
      tanggal: item.tanggal,
      tahun: item.tahun,
      gambar: null,
    });
  };

  // Fungsi untuk menangani penambahan siswa
  const handleTambahSiswa = () => {
    if (namaSiswa.trim()) {
      setForm({
        ...form,
        siswa: [...form.siswa, namaSiswa.trim()]
      });
      setNamaSiswa(""); // Reset input setelah menambah
    }
  };

  // Fungsi untuk menghapus siswa
  const handleHapusSiswa = (index: number) => {
    setForm({
      ...form,
      siswa: form.siswa.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate dates
      const currentDate = new Date();
      const selectedDate = new Date(form.tanggal);
      if (selectedDate > currentDate) {
        toast.error("Tanggal tidak boleh lebih dari hari ini");
        setLoading(false);
        return;
      }

      // Validate file
      if (form.gambar) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(form.gambar.type)) {
          toast.error('Format file harus jpg, jpeg, png, atau webp');
          setLoading(false);
          return;
        }
        if (form.gambar.size > 5 * 1024 * 1024) {
          toast.error("Ukuran gambar tidak boleh lebih dari 5MB");
          setLoading(false);
          return;
        }
      }

      const formData = new FormData();
      formData.append("judul", form.judul.trim());
      formData.append("tingkat", form.tingkat.trim());
      // Kirim array siswa sebagai JSON string
      formData.append("siswa", JSON.stringify(form.siswa.filter(s => s.trim())));
      formData.append("deskripsi", form.deskripsi.trim());
      formData.append("tanggal", form.tanggal);
      formData.append("tahun", form.tahun);

      if (!editId && !form.gambar) {
        toast.error("Silakan pilih file gambar");
        setLoading(false);
        return;
      }

      if (form.gambar) {
        formData.append("gambar", form.gambar);
      }

      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      let response;
      if (editId) {
        formData.append("_method", "PUT");
        response = await API.post(`/prestasi/${editId}`, formData, config);
        toast.success("Prestasi berhasil diperbarui");
      } else {
        response = await API.post("/prestasi", formData, config);
        toast.success("Prestasi berhasil ditambahkan");
      }

      resetForm();
      await fetchPrestasi();

      localStorage.setItem("prestasi_updated", Date.now().toString());
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("prestasi_updated"));
    } catch (error: any) {
      console.error('Error detail:', error.response?.data);
      if (error.response?.data?.errors) {
        // Show each validation error
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((message: string) => {
              toast.error(`${field}: ${message}`);
            });
          }
        });
      } else {
        toast.error('Gagal menyimpan prestasi');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus prestasi ini?")) {
      try {
        await API.delete(`/prestasi/${id}`);
        toast.success("Prestasi berhasil dihapus");
        fetchPrestasi();
      } catch (error) {
        toast.error("Gagal menghapus prestasi");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#154472] mb-2">
        Kelola Prestasi
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Halaman ini digunakan untuk mengelola informasi prestasi sekolah
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-2">Judul Prestasi</label>
          <input
            type="text"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Tingkat</label>
          <input
            type="text"
            value={form.tingkat}
            onChange={(e) => setForm({ ...form, tingkat: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
            required
          />
        </div>

        {/* Hapus input siswa yang lama */}

        <div>
          <label className="block text-gray-700 mb-2">Daftar Siswa</label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={namaSiswa}
                onChange={(e) => setNamaSiswa(e.target.value)}
                placeholder="Masukkan nama siswa"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-black"
              />
              <button
                type="button"
                onClick={handleTambahSiswa}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
              >
                Tambah Siswa
              </button>
            </div>

            <div className="mt-2">
              {form.siswa.length === 0 && (
                <p className="text-gray-500 italic">Belum ada siswa ditambahkan</p>
              )}
              {form.siswa.map((siswa, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                  <span className="text-black">{siswa}</span>
                  <button
                    type="button"
                    onClick={() => handleHapusSiswa(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Deskripsi</label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] text-black"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Tanggal</label>
          <input
            type="date"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
            required
          />
        </div>
        <div>
  <label className="block text-gray-700 mb-2">Tahun</label>
  <select
    value={form.tahun}
    onChange={(e) => setForm({ ...form, tahun: e.target.value })}
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
    required
  >
    <option value="">Pilih Tahun</option>
    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(
      (year) => (
        <option key={year} value={`${year}-01-01`}>
          {year}
        </option>
      )
    )}
  </select>
</div>

        <div>
          <label className="block text-gray-700 mb-2">Gambar</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-black"
            accept="image/*"
            required={!editId}
          />
          {editId && (
            <p className="text-sm text-gray-500 mt-1">
              Biarkan kosong jika tidak ingin mengubah gambar
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#154472] hover:bg-[#1a5a99] text-white py-2 px-4 rounded-lg"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Menyimpan...
              </span>
            ) : editId ? (
              "Perbarui"
            ) : (
              "Simpan"
            )}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({
                  judul: "",
                  tingkat: "",
                  siswa: [],
                  deskripsi: "",
                  tanggal: "",
                  tahun: "",
                  gambar: null,
                });
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Batal
            </button>
          )}
        </div>
      </form>
      // Hapus bagian daftar siswa yang berada di luar form
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prestasi.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={`http://localhost:8000/storage/${item.gambar}`}
                alt={`prestasi ${item.judul}`}
                className="w-full h-48 object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#154472]">
              {item.judul}
            </h3>
            <p className="text-gray-600 mt-1">Tingkat: {item.tingkat}</p>
            <p className="text-sm text-gray-600 mt-1">
              Siswa: {Array.isArray(item.siswa) ? item.siswa.join(", ") : JSON.parse(item.siswa).join(", ")}
            </p>
            <p className="text-gray-600 mt-2 mb-2 line-clamp-3">
              {item.deskripsi}
            </p>
            <p className="text-sm text-gray-500">
              Tanggal: {new Date(item.tanggal).toLocaleDateString("id-ID")}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Tahun:{" "}
              {new Date(item.tahun).toLocaleDateString("id-ID", {
                year: "numeric",
              })}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
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
