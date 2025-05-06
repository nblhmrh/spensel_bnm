"use client";
import React, { useState, useEffect } from 'react';
import API from '@/utils/api';

import { motion } from 'framer-motion';

export default function ProfilBKContent() {
  // Removed unused router variable
  const [formData, setFormData] = useState({
    visi: '',
    misi: '',
    intro_text: '',
    teacher_name: '',
    teacher_birth: '',
    teacher_education: '',
    teacher_instagram: '',
    teacher_photo: null as File | null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    fetchProfilBK();
  }, []);

  const fetchProfilBK = async () => {
    try {
      const response = await API.get('/profilbk');
      if (response.data) {
        setFormData({
          ...response.data,
          teacher_photo: null
        });
        setPreviewImage(`${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.teacher_photo}`);
      }
    } catch (error) {
      console.error('Error fetching profil BK:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        teacher_photo: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi sederhana di frontend
    if (
      !formData.visi ||
      !formData.misi ||
      !formData.intro_text ||
      !formData.teacher_name ||
      !formData.teacher_birth ||
      !formData.teacher_education ||
      !formData.teacher_instagram
      // HAPUS validasi teacher_photo di sini agar bisa nullable
    ) {
      setMessage({ type: 'error', content: 'Semua field wajib diisi.' });
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "teacher_photo") {
          if (value) {
            formDataToSend.append(key, value);
          }
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      
      await API.post('/profilbk', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', content: 'Profil BK berhasil diupdate!' });
      setTimeout(() => setMessage({ type: '', content: '' }), 3000);
    } catch (error: any) {
      // Ambil pesan error dari backend jika ada
      let errorMsg = 'Gagal mengupdate Profil BK.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      }
      setMessage({ type: 'error', content: errorMsg });
      console.error('Error updating profil BK:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div 
        className="bg-[#154472] w-full h-[300px] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.section 
          className="flex flex-col py-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">Kelola Profil BK</h1>
        </motion.section>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {message.content && (
            <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.content}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Teks Pengantar</label>
            <textarea
              name="intro_text"
              value={formData.intro_text}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Visi</label>
            <textarea
              name="visi"
              value={formData.visi}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Misi</label>
            <textarea
              name="misi"
              value={formData.misi}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={6}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nama Guru BK</label>
            <input
              type="text"
              name="teacher_name"
              value={formData.teacher_name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tempat, Tanggal Lahir</label>
            <input
              type="text"
              name="teacher_birth"
              value={formData.teacher_birth}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pendidikan</label>
            <input
              type="text"
              name="teacher_education"
              value={formData.teacher_education}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Instagram</label>
            <input
              type="text"
              name="teacher_instagram"
              value={formData.teacher_instagram}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Foto</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept="image/*"
            />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 max-w-xs rounded" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </motion.form>
      </div>
    </>
  );
}