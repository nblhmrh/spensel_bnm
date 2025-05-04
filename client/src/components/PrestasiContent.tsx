"use client";

import React, { useState, useEffect } from 'react';
import API from '@/utils/api';
import { toast } from 'react-toastify';

interface Prestasi {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  gambar: string;
}

export default function PrestasiAdmin() {
  const [prestasi, setPrestasi] = useState<Prestasi[]>([]);
  const [form, setForm] = useState({
    judul: '',
    deskripsi: '',
    tanggal: '',
    gambar: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchPrestasi = async () => {
    try {
      const response = await API.get('/prestasi');
      setPrestasi(response.data);
    } catch (error) {
      toast.error('Gagal memuat data prestasi');
    }
  };

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({
        ...form,
        gambar: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('judul', form.judul);
      formData.append('deskripsi', form.deskripsi);
      formData.append('tanggal', form.tanggal);
  
      if (editId) {
        if (form.gambar) formData.append('gambar', form.gambar);
        formData.append('_method', 'PUT');
      } else {
        if (!form.gambar) {
          toast.error('Silakan pilih file gambar');
          setLoading(false);
          return;
        }
        formData.append('gambar', form.gambar);
      }

      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      let response;
      if (editId) {
        response = await API.post(`/prestasi/${editId}`, formData, config);
        toast.success('Prestasi berhasil diperbarui');
      } else {
        response = await API.post('/prestasi', formData, config);
        toast.success('Prestasi berhasil ditambahkan');
      }

      setForm({ judul: '', deskripsi: '', tanggal: '', gambar: null });
      setEditId(null);
      await fetchPrestasi();
      
      localStorage.setItem('prestasi_updated', Date.now().toString());
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('prestasi_updated'));
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal menyimpan prestasi');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Prestasi) => {
    setEditId(item.id);
    setForm({
      judul: item.judul,
      deskripsi: item.deskripsi,
      tanggal: item.tanggal,
      gambar: null
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) {
      try {
        await API.delete(`/prestasi/${id}`);
        toast.success('Prestasi berhasil dihapus');
        fetchPrestasi();
      } catch (error) {
        toast.error('Gagal menghapus prestasi');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#154472] mb-2">Kelola Prestasi</h1>
      <p className="text-lg text-gray-600 mb-8">
        Halaman ini digunakan untuk mengelola informasi prestasi sekolah
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4">
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
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </span>
            ) : editId ? "Perbarui" : "Simpan"}
          </button>
          
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ judul: '', deskripsi: '', tanggal: '', gambar: null });
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Batal
            </button>
          )}
        </div>
      </form>

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
            <h3 className="text-xl font-semibold text-[#154472]">{item.judul}</h3>
            <p className="text-gray-600 mt-2 mb-4">{item.deskripsi}</p>
            <p className="text-sm text-gray-500 mb-4">{new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
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