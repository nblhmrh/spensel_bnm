"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function BuatAkunAdminBK() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin"
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");

  // Fetch user list
  useEffect(() => {
    const fetchUsers = async () => {
      setUserLoading(true);
      setUserError("");
      try {
        const res = await axios.get("http://localhost:8000/api/users?roles=admin,bk");
        setUsers(res.data);
      } catch (err: any) {
        setUserError("Gagal mengambil data user");
      } finally {
        setUserLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:8000/api/register", formData);
      setSuccess("Akun berhasil dibuat!");
      setFormData({ name: "", email: "", password: "", role: "admin" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      console.log("Akun berhasil dibuat!");
    }
    if (error) {
      console.log("Terjadi error: ", error);
    }
  }, [success, error]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#154472]">Buat Akun Admin/BK</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-[#154472]">Nama</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-black" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-[#154472]">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-black" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-[#154472]">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-black" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-[#154472]">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-3 py-2 rounded text-black">
            <option value="admin">Admin</option>
            <option value="bk">BK</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Memproses..." : "Buat Akun"}
        </button>
      </form>
      <hr className="my-6" />
      <h3 className="text-xl font-bold mb-2 text-[#154472]">Daftar User Admin & BK</h3>
      {userLoading && <div>Memuat data user...</div>}
      {userError && <div className="text-red-600 mb-2">{userError}</div>}
      <ul>
        {users.map((user: any) => (
          <li key={user.id} className="mb-2 border-b pb-1">
            <span className="font-semibold text-black">{user.name}</span> - <span className="font-semibold text-black">{user.email}</span> <span className="text-xs bg-gray-200 px-2 py-1 rounded ml-2 text-black">{user.role}</span>
          </li>
        ))}
        {users.length === 0 && !userLoading && <li>Tidak ada user admin/bk.</li>}
      </ul>
    </div>
  );
}
