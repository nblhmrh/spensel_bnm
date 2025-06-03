"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Berkas {
  id: number;
  surat_lulus_url: string;
  surat_baik_url: string;
  kartu_keluarga_url: string;
  akta_lahir_url: string;
  foto_url: string;
}

const initialFiles = {
  surat_lulus: null as File | null,
  surat_baik: null as File | null,
  kartu_keluarga: null as File | null,
  akta_lahir: null as File | null,
  foto: null as File | null,
};

export default function BerkasPage() {
  const router = useRouter();
  const [berkas, setBerkas] = useState<Berkas | null>(null);
  const [files, setFiles] = useState(initialFiles);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch berkas user
  const fetchBerkas = async () => {
    try {
      const token = localStorage.getItem("token");
      // Ganti endpoint agar hanya ambil berkas user login
      const res = await axios.get("http://localhost:8000/api/berkas/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBerkas(res.data.data || null);
    } catch {
      setBerkas(null);
    }
  };

  useEffect(() => {
    fetchBerkas();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: uploadedFiles } = e.target;
    if (uploadedFiles && uploadedFiles[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: uploadedFiles[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key as keyof typeof files]) {
        formData.append(key, files[key as keyof typeof files] as File);
      }
    });
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/berkas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Berkas berhasil diunggah!");
      setFiles(initialFiles);
      setSubmitted(true); // <-- hanya tampilkan pesan
      fetchBerkas();
    } catch {
      toast.error("Gagal mengunggah berkas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!berkas) return;
    if (!window.confirm("Yakin ingin menghapus berkas ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/berkas/${berkas.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Berkas berhasil dihapus!");
      setFiles(initialFiles);
      await fetchBerkas(); // refresh data agar form upload muncul
    } catch {
      toast.error("Gagal menghapus berkas");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Unggah Berkas
      </h1>

      <button
        onClick={() => router.push("/Pendaftaran")}
        className="mb-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
        disabled={loading}
      >
        Kembali
      </button>

      {submitted && berkas ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center text-black">
          <h2 className="text-xl font-semibold mb-4">Data berhasil dikirim</h2>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mr-2"
            disabled={loading}
          >
            Hapus Berkas
          </button>
          <button
            onClick={() => router.push("/Pendaftaran")}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition ml-2"
            disabled={loading}
          >
            Kembali
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-black"
        >
          {Object.keys(files).map((key) => (
            <div key={key}>
              <label className="block font-medium mb-1 capitalize text-black">
                {key.replace("_", " ")}
              </label>
              <input
                type="file"
                name={key}
                accept={
                  key === "foto" ? ".jpg,.jpeg,.png" : ".pdf,.jpg,.jpeg,.png"
                }
                onChange={handleFileChange}
                className="w-full border rounded p-2 text-black"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Menyimpan..." : "Unggah Berkas"}
          </button>
        </form>
      )}
    </div>
  );
}
