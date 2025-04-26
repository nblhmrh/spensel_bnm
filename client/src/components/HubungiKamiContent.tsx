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
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/hubungi-kami");
      // Handle both array and object responses
      const messages = Array.isArray(res.data)
        ? res.data
        : res.data.data
        ? res.data.data
        : [];

      setData(messages); // Set data regardless of length
      setIsLoading(false); // Stop loading state
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Remove the interval - we don't want auto refresh
  }, []);

  const handleDelete = async (id: number) => {
    // Replace window.confirm with a custom modal
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
              <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg" id="cancel">
                Batal
              </button>
              <button class="px-4 py-2 bg-red-800 text-white hover:bg-red-700 rounded-lg" id="confirm">
                Hapus
              </button>
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

        // Close on outside click
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
      toast.custom(
        () => (
          <div
            className={`${"animate-enter"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-row ring-1 ring-black ring-opacity-5`}
          ></div>
        ),
        {
          duration: 2000,
          position: "bottom-center",
        }
      );
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data", error);
      toast.custom(
        () => (
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 pt-0.5">
                  <svg
                    className="h-10 w-10 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Gagal!</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Gagal menghapus pesan.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss()}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
              >
                Tutup
              </button>
            </div>
          </div>
        ),
        {
          duration: 2000,
          position: "bottom-center",
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `http://localhost:8000/api/hubungi-kami/${editId}`,
          form
        );
        toast.success("Pesan berhasil diperbarui", {
          style: {
            background: "#4CAF50",
            color: "white",
            border: "none",
          },
          position: "bottom-center",
          duration: 2000,
          className: "modern-toast",
        });
      } else {
        await axios.post("http://localhost:8000/api/hubungi-kami", form);
        toast.success("Pesan berhasil ditambahkan", {
          style: {
            background: "#4CAF50",
            color: "white",
            border: "none",
          },
          position: "bottom-center",
          duration: 2000,
          className: "modern-toast",
        });
      }
      setForm({ nama: "", email: "", pesan: "" });
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Gagal menyimpan data", error);
      toast.error("Gagal menyimpan pesan", {
        style: {
          background: "#f44336",
          color: "white",
          border: "none",
        },
        position: "bottom-center",
        duration: 2000,
        className: "modern-toast",
      });
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
                      className="bg-yellow-300 text-white px-3 py-1 rounded hover:bg-yellow-500"
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
