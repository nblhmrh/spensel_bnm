"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSignOutAlt, FaHome, FaUserPlus, FaBullhorn, FaQuestionCircle, FaTrash } from "react-icons/fa";
import Image from "next/image";
import logo from '@/assets/logo.png';
import axios from "axios";

export default function FormOrangTua() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_ayah: "",
    kontak_ayah: "",
    pekerjaan_ayah: "",
    penghasilan_ayah: "",
    alamat_ayah: "",
    nama_ibu: "",
    kontak_ibu: "",
    pekerjaan_ibu: "",
    penghasilan_ibu: "",
    alamat_ibu: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataId, setDataId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Proteksi role user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      router.replace("/Welcome");
      return;
    }
    let userObj;
    try {
      userObj = JSON.parse(user);
    } catch {
      router.replace("/Welcome");
      return;
    }
    if (!userObj.role || userObj.role !== "user") {
      router.replace("/Welcome");
    }
  }, [router]);

  // Ambil data ortu user jika sudah pernah mengisi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/dataortu/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.data) {
          setFormData({
            nama_ayah: res.data.data.nama_ayah || "",
            kontak_ayah: res.data.data.kontak_ayah || "",
            pekerjaan_ayah: res.data.data.pekerjaan_ayah || "",
            penghasilan_ayah: res.data.data.penghasilan_ayah || "",
            alamat_ayah: res.data.data.alamat_ayah || "",
            nama_ibu: res.data.data.nama_ibu || "",
            kontak_ibu: res.data.data.kontak_ibu || "",
            pekerjaan_ibu: res.data.data.pekerjaan_ibu || "",
            penghasilan_ibu: res.data.data.penghasilan_ibu || "",
            alamat_ibu: res.data.data.alamat_ibu || "",
          });
          setDataId(res.data.data.id);
        } else {
          setDataId(null);
        }
      } catch {
        setDataId(null);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg("");
    try {
      const token = localStorage.getItem("token");
      if (dataId) {
        // Update
        await axios.put(`http://127.0.0.1:8000/api/dataortu/${dataId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMsg("Data berhasil diupdate!");
      } else {
        // Simpan baru
        await axios.post("http://127.0.0.1:8000/api/dataortu", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccessMsg("Data berhasil disimpan!");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "Terjadi kesalahan";
        alert(errorMessage);
      } else {
        alert("Gagal mengirim data. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!dataId) return;
    if (!window.confirm("Yakin ingin menghapus data orang tua ini?")) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/dataortu/${dataId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMsg("Data berhasil dihapus!");
      setFormData({
        nama_ayah: "",
        kontak_ayah: "",
        pekerjaan_ayah: "",
        penghasilan_ayah: "",
        alamat_ayah: "",
        nama_ibu: "",
        kontak_ibu: "",
        pekerjaan_ibu: "",
        penghasilan_ibu: "",
        alamat_ibu: "",
      });
      setDataId(null);
    } catch (error) {
      alert("Gagal menghapus data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <div>
          {/* Logo dan Nama Sekolah */}
          <div className="items-center">
            <Image src={logo} width={80} height={80} alt="Logo Sekolah" />
          </div>
          <h2 className="text-center font-bold text-lg flex-2 text-gray-800">
            UPT SMPN 9 Binamu
          </h2>

          {/* Menu Navigasi */}
          <nav className="text-[#154472] space-y-4 mt-4">
            <button 
             onClick={() => router.push("/Berandappdb")}
             className="flex items-center text-left w-full px-4 py-2 rounded-lg ">
              <FaHome className="mr-2" /> Beranda
            </button>
            <button
              onClick={() => router.push("/Pendaftaran")}
              className="flex items-center text-left w-full px-4 py-2 bg-blue-100 font-semibold text-blue-800 hover:bg-gray-200 rounded-lg"
            >
              <FaUserPlus className="mr-2" /> Pendaftaran
            </button>
            <button
              onClick={() => router.push("/Pengumuman")}
              className="flex items-center text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg"
            >
              <FaBullhorn className="mr-2" /> Pengumuman
            </button>
            <button
              onClick={() => router.push("/Bantuan")}
              className="flex items-center text-left w-full px-4 py-2 hover:bg-gray-200 rounded-lg"
            >
              <FaQuestionCircle className="mr-2" /> Bantuan
            </button>
          </nav>
        </div>
        {/* Tombol Keluar */}
        <button
        onClick={() => router.push("/Welcome")}
          className="mt-auto bg-[#154472] text-white py-2 flex items-center justify-center rounded-lg hover:bg-red-800"
        >
          <FaSignOutAlt className="mr-2" /> Keluar
        </button>
      </aside>

      {/* Formulir */}
      <main className="flex-1 p-10">
      <button onClick={() => router.push("/Pendaftaran")} className="text-blue-800 flex items-center mb-4">
                  <FaArrowLeft className="mr-2" /> Kembali
        </button>
        <h1 className="text-2xl font-bold text-[#154472]">Isi Data Orang Tua / Wali</h1>

        {successMsg && (
          <div className="my-4 p-4 bg-green-100 text-green-800 rounded text-center font-semibold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-lg text-gray-700">
          {/* Data Ayah */}
          <h2 className="font-bold text-lg">Data Ayah</h2>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Nama Ayah</label>
            <input type="text" name="nama_ayah" value={formData.nama_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">No. Kontak/WhatsApp Ayah</label>
            <input type="text" name="kontak_ayah" value={formData.kontak_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Pekerjaan Ayah</label>
            <input type="text" name="pekerjaan_ayah" value={formData.pekerjaan_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Penghasilan Ayah (Rp/Bulan)</label>
            <input type="text" name="penghasilan_ayah" value={formData.penghasilan_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Alamat Ayah</label>
            <input type="text" name="alamat_ayah" value={formData.alamat_ayah} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          {/* Data Ibu */}
          <h2 className="mt-6 font-bold text-lg">Data Ibu</h2>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Nama Ibu</label>
            <input type="text" name="nama_ibu" value={formData.nama_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">No. Kontak/WhatsApp Ibu</label>
            <input type="text" name="kontak_ibu" value={formData.kontak_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Pekerjaan Ibu</label>
            <input type="text" name="pekerjaan_ibu" value={formData.pekerjaan_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Penghasilan Ibu (Rp/Bulan)</label>
            <input type="text" name="penghasilan_ibu" value={formData.penghasilan_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Alamat Ibu</label>
            <input type="text" name="alamat_ibu" value={formData.alamat_ibu} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-[#154472] text-white p-3 rounded-md hover:bg-[#123A60]"
          >
            {isLoading ? "Menyimpan..." : dataId ? "Update" : "Simpan"}
          </button>
          {dataId && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="mt-4 w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 flex items-center justify-center"
            >
              <FaTrash className="mr-2" /> Hapus Data
            </button>
          )}
        </form>
      </main>
    </div>
  );
}
