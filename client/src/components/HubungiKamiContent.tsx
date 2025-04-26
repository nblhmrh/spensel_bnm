"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type Pesan = {
  id: number;
  nama: string;
  email: string;
  pesan: string;
  created_at: string;
};

export default function HubungiKamiContent() {
  const [data, setData] = useState<Pesan[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (showToast = false) => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:8000/api/hubungi-kami");
      const messages = Array.isArray(res.data)
        ? res.data
        : res.data.data
        ? res.data.data
        : [];
      setData(messages);

      if (showToast) {
        toast.success("Data berhasil dimuat", {
          position: "bottom-center",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Gagal memuat data", error);
      setData([]);
      toast.error("Gagal memuat data", {
        position: "bottom-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true); // load saat pertama mount + tampilkan toast
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = () => {
      return new Promise((resolve) => {
        const modal = document.createElement("div");
        modal.className =
          "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
        modal.innerHTML = `
          <div class="bg-white rounded-lg p-6 max-w-sm mx-4 transform transition-all">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p class="text-gray-600 mb-6">Yakin ingin menghapus pesan ini?</p>
            <div class="flex justify-end gap-3">
              <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" id="cancel">Batal</button>
              <button class="px-4 py-2 bg-red-800 text-white hover:bg-red-700 rounded-lg" id="confirm">Hapus</button>
            </div>
          </div>
        `;

        document.body.appendChild(modal);
        const confirmBtn = modal.querySelector("#confirm");
        const cancelBtn = modal.querySelector("#cancel");

        confirmBtn?.addEventListener("click", () => {
          document.body.removeChild(modal);
          resolve(true);
        });

        cancelBtn?.addEventListener("click", () => {
          document.body.removeChild(modal);
          resolve(false);
        });

        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
            resolve(false);
          }
        });
      });
    };

    try {
      const confirmed = await confirmDelete();
      if (!confirmed) return;

      await axios.delete(`http://localhost:8000/api/hubungi-kami/${id}`);
      toast.success("Pesan berhasil dihapus", {
        position: "bottom-center",
        duration: 2000,
      });
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data", error);
      toast.error("Gagal menghapus pesan", {
        position: "bottom-center",
        duration: 2000,
      });
    }
  };

  const validateForm = () => {
    if (!form.nama.trim()) {
      toast.error("Nama tidak boleh kosong", {
        position: "bottom-center",
        duration: 2000,
      });
      return false;
    }
    
    if (!form.email.trim()) {
      toast.error("Email tidak boleh kosong", {
        position: "bottom-center",
        duration: 2000,
      });
      return false;
    }
    
    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Format email tidak valid", {
        position: "bottom-center",
        duration: 2000,
      });
      return false;
    }
    
    if (!form.pesan.trim()) {
      toast.error("Pesan tidak boleh kosong", {
        position: "bottom-center",
        duration: 2000,
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Pastikan data yang dikirim bersih
    const formData = {
      nama: form.nama.trim(),
      email: form.email.trim(),
      pesan: form.pesan.trim()
    };
    
    try {
      if (editId) {
        await axios.put(
          `http://localhost:8000/api/hubungi-kami/${editId}`,
          formData
        );
        toast.success("Pesan berhasil diperbarui", {
          position: "bottom-center",
          duration: 2000,
        });
      } else {
        await axios.post("http://localhost:8000/api/hubungi-kami", formData);
        toast.success("Pesan berhasil ditambahkan", {
          position: "bottom-center",
          duration: 2000,
        });
      }
      setForm({ nama: "", email: "", pesan: "" });
      setEditId(null);
      fetchData();
    } catch (error: any) {
      console.error("Gagal menyimpan data", error);
      
      // Tampilkan detail error yang lebih spesifik
      if (error.response) {
        // Server merespons dengan status code di luar range 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        toast.error(`Error: ${error.response.data?.message || 'Terjadi kesalahan pada server'}`, {
          position: "bottom-center",
          duration: 3000,
        });
      } else if (error.request) {
        // Request dibuat tapi tidak ada respons
        console.error('Error request:', error.request);
        toast.error('Tidak ada respons dari server. Periksa koneksi Anda.', {
          position: "bottom-center",
          duration: 3000,
        });
      } else {
        // Kesalahan lainnya
        toast.error(`Error: ${error.message}`, {
          position: "bottom-center",
          duration: 3000,
        });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-[#1D3557] mb-6">
        Admin - Hubungi Kami
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => fetchData(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
        >
          Reload Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg text-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg text-gray-700"
        />
        <textarea
          name="pesan"
          placeholder="Pesan"
          value={form.pesan}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-lg text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          {editId ? "Update" : "Tambah"} Pesan
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-[#1D3557] text-white">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Pesan</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
                    Memuat data...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada pesan.
                </td>
              </tr>
            ) : (
              data.map((pesan) => (
                <tr
                  key={pesan.id}
                  className="border-t hover:bg-gray-50 text-gray-700"
                >
                  <td className="px-4 py-2">{pesan.nama}</td>
                  <td className="px-4 py-2">{pesan.email}</td>
                  <td className="px-4 py-2">{pesan.pesan}</td>
                  <td className="px-4 py-2">
                    {new Date(pesan.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(pesan.id);
                        setForm({
                          nama: pesan.nama,
                          email: pesan.email,
                          pesan: pesan.pesan,
                        });
                      }}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pesan.id)}
                      className="bg-red-800 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
