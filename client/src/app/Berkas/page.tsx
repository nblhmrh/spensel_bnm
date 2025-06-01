"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function BerkasUpload() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState({
    surat_lulus: null,
    surat_baik: null,
    kartu_keluarga: null,
    akta_lahir: null,
    foto: null,
  });
  const [preview, setPreview] = useState({
    surat_lulus: "",
    surat_baik: "",
    kartu_keluarga: "",
    akta_lahir: "",
    foto: "",
  });

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (uploadedFiles && uploadedFiles[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: uploadedFiles[0],
      }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(uploadedFiles[0]);
      setPreview((prev) => ({
        ...prev,
        [name]: previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const response = await axios.post("http://localhost:8000/api/berkas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Berkas berhasil diunggah!");
      router.push("/Berandappdb");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("Gagal mengunggah berkas");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-black text-center mb-6">Unggah Berkas</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Surat Keterangan Lulus */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Surat Keterangan Lulus
            </label>
            <input
              type="file"
              name="surat_lulus"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
              required
            />
            {preview.surat_lulus && (
              <div className="mt-2">
                <img src={preview.surat_lulus} alt="Preview" className="h-20 object-contain" />
              </div>
            )}
          </div>

          {/* Surat Keterangan Berlaku Baik */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Surat Keterangan Berlaku Baik
            </label>
            <input
              type="file"
              name="surat_baik"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
              required
            />
            {preview.surat_baik && (
              <div className="mt-2">
                <img src={preview.surat_baik} alt="Preview" className="h-20 object-contain" />
              </div>
            )}
          </div>

          {/* Kartu Keluarga */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Kartu Keluarga
            </label>
            <input
              type="file"
              name="kartu_keluarga"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
              required
            />
            {preview.kartu_keluarga && (
              <div className="mt-2">
                <img src={preview.kartu_keluarga} alt="Preview" className="h-20 object-contain" />
              </div>
            )}
          </div>

          {/* Akta Lahir */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Akta Lahir
            </label>
            <input
              type="file"
              name="akta_lahir"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
              required
            />
            {preview.akta_lahir && (
              <div className="mt-2">
                <img src={preview.akta_lahir} alt="Preview" className="h-20 object-contain" />
              </div>
            )}
          </div>

          {/* Foto */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Foto (3x4)
            </label>
            <input
              type="file"
              name="foto"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
              required
            />
            {preview.foto && (
              <div className="mt-2">
                <img src={preview.foto} alt="Preview" className="h-20 object-contain" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
              transition duration-200 disabled:bg-gray-400"
          >
            {isLoading ? "Mengunggah..." : "Unggah Berkas"}
          </button>
        </form>
      </div>
    </div>
  );
}