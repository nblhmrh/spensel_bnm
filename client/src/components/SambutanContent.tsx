'use client'
'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  nama: string;
  isi: string;
  foto: File | null;
}

interface SambutanData {
  id: number;
  nama: string;
  isi: string;
  foto: string;
}


export default function SambutanContent() {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    isi: '',
    foto: null
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [existingSambutan, setExistingSambutan] = useState<SambutanData[]>([]);

  // Fetch existing sambutan data
  const fetchSambutan = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sambutan');
      if (response.data.status && response.data.data.length > 0) {
        setExistingSambutan(response.data.data);
        // Pre-fill form with existing data if available
        const latestSambutan = response.data.data[0];
        setFormData({
          nama: latestSambutan.nama,
          isi: latestSambutan.isi,
          foto: null
        });
      }
    } catch (error) {
      console.error('Error fetching sambutan:', error);
    }
  };

  useEffect(() => {
    fetchSambutan();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate required fields
    if (!formData.nama || !formData.isi || !formData.foto) {
      setMessage('Semua field harus diisi termasuk foto');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('isi', formData.isi);
    if (formData.foto) {
      data.append('foto', formData.foto);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/sambutan', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });
      
      if (response.data.status) {
        setMessage('Sambutan berhasil ditambahkan');
        setFormData({ nama: '', isi: '', foto: null });
        fetchSambutan(); // Refresh data after successful creation
      } else {
        setMessage(response.data.message || 'Gagal menambahkan sambutan');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating sambutan:', error.response?.data || error);
        setMessage(error.response?.data?.message || 'Gagal menambahkan sambutan');
      } else {
        console.error('Error creating sambutan:', error);
        setMessage('Gagal menambahkan sambutan');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setLoading(true);
    
    // Validasi data
    if (!formData.nama || !formData.isi) {
      setMessage('Nama dan isi sambutan harus diisi');
      setLoading(false);
      return;
    }
  
    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('isi', formData.isi);
    if (formData.foto) {
      data.append('foto', formData.foto);
    }
    data.append('_method', 'PUT');
  
    try {
      const response = await axios.post(`http://localhost:8000/api/sambutan/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });
      
      if (response.data.status) {
        setMessage('Sambutan berhasil diperbarui');
        fetchSambutan(); // Refresh data
        // Di dalam fungsi handleUpdate setelah berhasil update
        localStorage.setItem('sambutan_updated', Date.now().toString());
      } else {
        setMessage(response.data.message || 'Gagal memperbarui sambutan');
      }
    } catch (error) {
      console.error('Error updating sambutan:', error);
      setMessage('Gagal memperbarui sambutan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus sambutan ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/sambutan/${id}`);
        setMessage('Sambutan berhasil dihapus');
        // Refresh data after successful deletion
        fetchSambutan();
        setFormData({ nama: '', isi: '', foto: null });
      } catch (error) {
        setMessage('Gagal menghapus sambutan');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#154472]">Kelola Sambutan Kepala Sekolah</h2>
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      {/* Display existing sambutan if available */}
      {existingSambutan.length > 0 && (
        <div className="mb-6 p-6 border-2 border-[#154472] rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-[#154472]">Sambutan Saat Ini</h3>
          <div className="space-y-3">
            <p className="text-gray-700"><span className="font-semibold">Nama:</span> {existingSambutan[0].nama}</p>
            <p className="text-gray-700"><span className="font-semibold">Isi:</span> {existingSambutan[0].isi.substring(0, 100)}...</p>
          </div>
          <div className="mt-4 flex gap-3">
            <button 
              onClick={() => handleUpdate(existingSambutan[0].id)}
              className="bg-[#154472] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
            >
              Update
            </button>
            <button 
              onClick={() => handleDelete(existingSambutan[0].id)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      
      <form onSubmit={handleCreate} className="space-y-6 bg-white p-6 rounded-lg border-2 border-[#154472]">
        <div>
          <label className="block mb-2 text-lg font-medium text-[#154472]">Nama Kepala Sekolah</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-[#154472] focus:ring-2 focus:ring-[#154472] transition-all duration-200"
          />
        </div>
        
        <div>
          <label className="block mb-2 text-lg font-medium text-[#154472]">Isi Sambutan</label>
          <textarea
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-[#154472] focus:ring-2 focus:ring-[#154472] transition-all duration-200"
            rows={5}
          />
        </div>
        
        <div>
          <label className="block mb-2 text-lg font-medium text-[#154472]">Foto</label>
          <input
            type="file"
            name="foto"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-600 focus:border-[#154472] focus:ring-2 focus:ring-[#154472] transition-all duration-200"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#154472] text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:bg-blue-300 transition-colors duration-200 font-medium"
        >
          {loading ? 'Menyimpan...' : 'Simpan Sambutan'}
        </button>
      </form>
    </div>
  );
}