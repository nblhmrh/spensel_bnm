"use client";

import React, { useState, useEffect } from 'react';
import API from '@/utils/api';
import { toast } from 'react-toastify';

interface Berita {
  id: number;
  judul: string;
  thumbnail: string;
  foto: string;
  konten: string;
  slug: string;
}

export default function AdminBerita() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [form, setForm] = useState({
    judul: '',
    thumbnail: null as File | null,
    foto: null as File | null,
    konten: ''
  });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchBerita = async () => {
    try {
      const response = await API.get('/berita');
      setBerita(response.data);
    } catch (error) {
      toast.error('Gagal memuat data berita');
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      if (editId) {
        await API.post(`/berita/${editId}`, formData);
        toast.success('Berita berhasil diperbarui');
      } else {
        await API.post('/berita', formData);
        toast.success('Berita berhasil ditambahkan');
      }
      
      setForm({ judul: '', thumbnail: null, foto: null, konten: '' });
      setEditId(null);
      fetchBerita();
    } catch (error) {
      toast.error('Gagal menyimpan berita');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await API.delete(`/berita/${id}`);
        toast.success('Berita berhasil dihapus');
        fetchBerita();
      } catch (error) {
        toast.error('Gagal menghapus berita');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#154472] mb-6">Kelola Berita</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Judul</label>
          <input
            type="text"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Thumbnail</label>
          <input
            type="file"
            onChange={(e) => setForm({ ...form, thumbnail: e.target.files?.[0] || null })}
            className="w-full"
            accept="image/*"
            required={!editId}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Foto</label>
          <input
            type="file"
            onChange={(e) => setForm({ ...form, foto: e.target.files?.[0] || null })}
            className="w-full"
            accept="image/*"
            required={!editId}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Konten</label>
          <textarea
            value={form.konten}
            onChange={(e) => setForm({ ...form, konten: e.target.value })}
            className="w-full border rounded p-2 h-32"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#154472] text-white px-4 py-2 rounded hover:bg-[#1a5a99] transition-colors"
        >
          {loading ? 'Menyimpan...' : (editId ? 'Update' : 'Tambah')} Berita
        </button>
      </form>

      <div className="space-y-4">
        {berita.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.judul}</h3>
              <p className="text-sm text-gray-600">{item.slug}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditId(item.id);
                  setForm({
                    judul: item.judul,
                    thumbnail: null,
                    foto: null,
                    konten: item.konten
                  });
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800"
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