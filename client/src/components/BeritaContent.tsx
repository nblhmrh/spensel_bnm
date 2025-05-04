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
  const resetForm = () => {
    setForm({ judul: '', thumbnail: null, foto: null, konten: '' });
    setEditId(null);
    setCurrentBerita(null);
  };
  const [berita, setBerita] = useState<Berita[]>([]);
  const [selectedBerita, setSelectedBerita] = useState<string>('berita1');
  const [form, setForm] = useState({
    judul: '',
    thumbnail: null as File | null,
    foto: null as File | null,
    konten: ''
  });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentBerita, setCurrentBerita] = useState<Berita | null>(null);

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
    
    // Fungsi untuk menangani perubahan storage
    const handleStorageChange = () => {
      const lastUpdate = localStorage.getItem('berita_updated');
      if (lastUpdate) {
        fetchBerita();
        // Hapus flag setelah digunakan
        localStorage.removeItem('berita_updated');
      }
    };

    // Tambahkan event listener untuk storage dan custom event
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('berita_updated', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('berita_updated', handleStorageChange);
    };
  }, []);

  // Pastikan state form memiliki tipe yang benar
  interface FormState {
    judul: string;
    thumbnail: File | null;
    foto: File | null;
    konten: string;
  }
  
  // Pastikan fungsi handleFileChange menyimpan objek File, bukan string
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'foto') => {
    if (e.target.files && e.target.files[0]) {
      setForm({
        ...form,
        [field]: e.target.files[0]
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('judul', form.judul);
      formData.append('konten', form.konten);
      
      if (editId) {
        // Jika sedang edit, hanya append file jika ada perubahan
        if (form.thumbnail) formData.append('thumbnail', form.thumbnail);
        if (form.foto) formData.append('foto', form.foto);
        formData.append('_method', 'PUT'); // Untuk Laravel method spoofing
      } else {
        // Jika tambah baru, file wajib ada
        if (!form.thumbnail || !form.foto) {
          toast.error('Silakan pilih file thumbnail dan foto');
          setLoading(false);
          return;
        }
        formData.append('thumbnail', form.thumbnail);
        formData.append('foto', form.foto);
      }

      const config = {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      let response;
      if (editId) {
        response = await API.post(`/berita/${editId}`, formData, config);
        toast.success('Berita berhasil diupdate');
      } else {
        response = await API.post('/berita', formData, config);
        toast.success('Berita berhasil ditambahkan');
      }

      // Reset form dan refresh data
      setForm({ judul: '', thumbnail: null, foto: null, konten: '' });
      setEditId(null);
      setCurrentBerita(null);
      await fetchBerita();
      
      // Trigger update di komponen lain
      localStorage.setItem('berita_updated', Date.now().toString());
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('berita_updated'));
    } catch (error) {
      console.error('Error:', error);
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

      {/* Tambahkan pilihan berita */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-[#154472] mb-4">Pilih Berita</h2>
        <div className="grid grid-cols-3 gap-4">
          {['berita1', 'berita2', 'berita3', 'berita4', 'berita5', 'berita6'].map((beritaType) => (
            <button
              key={beritaType}
              onClick={() => setSelectedBerita(beritaType)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedBerita === beritaType
                  ? 'bg-[#154472] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {beritaType.charAt(0).toUpperCase() + beritaType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Judul {selectedBerita}</label>
          <input
            type="text"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="w-full border rounded p-2 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Thumbnail</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'thumbnail')}
            className="w-full text-black"
            accept="image/*"
            required={!editId}
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Foto</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'foto')}
            className="w-full text-black"
            accept="image/*"
            required={!editId}
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-2">Konten</label>
          <textarea
            value={form.konten}
            onChange={(e) => setForm({ ...form, konten: e.target.value })}
            className="w-full border rounded p-2 h-32 text-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#154472] text-white px-4 py-2 rounded hover:bg-[#1a5a99] transition-colors"
        >
          {loading ? 'Menyimpan...' : (editId ? 'Update' : 'Tambah')} {selectedBerita}
        </button>
      </form>

      <div className="space-y-4">
        {berita
          .filter(item => item.slug.startsWith(selectedBerita))
          .map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-black">{item.judul}</h3>
                <p className="text-sm text-black">{item.slug}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(item)}
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

const handleEdit = (item: Berita) => {
  setForm({
    judul: item.judul,
    thumbnail: null,
    foto: null,
    konten: item.konten
  });
  setEditId(item.id);
  setCurrentBerita(item);
};

// Tambahkan resetForm di sini
