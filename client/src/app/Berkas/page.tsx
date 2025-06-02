"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function BerkasUpload() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
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

  useEffect(() => {
    const checkExistingBerkas = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/berkas/check', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.exists) {
          alert('Anda sudah mengupload berkas sebelumnya');
          router.push('/Berandappdb');
        }
      } catch (error) {
        console.error('Error checking berkas:', error);
      }
    };

    checkExistingBerkas();
  }, [router]);

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
    if (hasUploaded) {
      alert('Anda sudah mengupload berkas');
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        "http://localhost:8000/api/berkas", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      console.log('Upload response:', response.data);
      setHasUploaded(true);
      alert("Berkas berhasil diunggah!");
      router.push("/Berandappdb");
    } catch (error) {
      console.error('Upload error:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Gagal mengunggah berkas";
        alert(errorMessage);
        // Log detailed error for debugging
        console.log('Error details:', error.response?.data);
        
        if (error.response?.status === 401) {
          alert("Silakan login terlebih dahulu");
          router.push("/login");
          return;
        }
      } else {
        alert("Gagal mengunggah berkas");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/Pendaftaran");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        {/* Add back button */}
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 
            flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Kembali
        </button>

        <h1 className="text-2xl font-bold text-black text-center mb-6">Unggah Berkas</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Modified input fields */}
          {Object.keys(files).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-black mb-2">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
              <input
                type="file"
                name={key}
                accept={key === 'foto' ? ".jpg,.jpeg,.png" : ".pdf,.jpg,.jpeg,.png"}
                onChange={handleFileChange}
                className="w-full border rounded p-2"
                required
                disabled={hasUploaded || isLoading}
              />
              {preview[key] && (
                <div className="mt-2">
                  <img src={preview[key]} alt="Preview" className="h-20 object-contain" />
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading || hasUploaded}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
              transition duration-200 disabled:bg-gray-400"
          >
            {isLoading ? "Mengunggah..." : hasUploaded ? "Berkas Sudah Diupload" : "Unggah Berkas"}
          </button>
        </form>
      </div>
    </div>
  );
}